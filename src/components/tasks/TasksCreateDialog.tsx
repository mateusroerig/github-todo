import { Modal, Form, Input, Select, DatePicker, Row, Col } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { priorityOptions, statusOptions } from "@/utils/constants";
import { useLoading } from "../Loading/LoadingContexts";
import { getPullRequests } from "@/services/github.service";
import { useEffect, useState } from "react";

interface TasksCreateDialogProps {
  open: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
}

type prOption = {
  label: JSX.Element;
  value: number;
  status: string;
  repository: string;
  title: string;
}

const TasksCreateDialog: React.FC<TasksCreateDialogProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const session = useSession();
  const { startLoading, stopLoading } = useLoading();
  const [prOptions, setPrOptions] = useState([] as prOption[]);

  useEffect(() => {
    const getPRStatus = (pr: any) => {
      if (pr.merged_at) return "merged";
      return pr.state;
    }
  
    const formatPRInfos = (prInfos: any) => {
      return prInfos.map((pr: any) => {
        const status = getPRStatus(pr);
        const statusColor = statusOptions.find((s) => s.value === status)?.color;
  
        const label = (
          <div>
            <span style={{ height: '10px', width: '10px', backgroundColor: statusColor, borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></span>
            {pr.title} <span style={{ color: '#888' }}>({pr.base.repo.name})</span>
          </div>
        );
  
        return {
          title: pr.title,
          value: pr.id,
          status,
          repository: pr.base.repo.name,
          label
        }
      })
    };

    const fetchPullRequests = async () => {
      try {
        const accessToken = (session.data as any)?.accessToken;
        if (!accessToken) return;

        const prInfos = await getPullRequests(accessToken);

        const formattedData = formatPRInfos(prInfos);

        setPrOptions(formattedData);
      } catch (error) {
        console.error('Failed to fetch pull requests:', error);
      }
    };

    fetchPullRequests();
  }, [session.data]);

  const [form] = Form.useForm();

  const handleSearch = (value: string) => {
    console.log("search:", value);
  };

  return (
    <Modal
      open={open}
      title="Criar Tarefa"
      okText="Criar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
        .validateFields()
        .then(async (values) => {
            startLoading();
            const taskInfos = {
              ...values,
              date: dayjs(values.date).toISOString(),
              userId: session?.data?.user?.id,
              pullRequest: undefined,
            }

            const selectedPrInfos = prOptions.find((pr) => pr.value === values.pullRequest)

            if (selectedPrInfos) {
              taskInfos.pullRequestId = selectedPrInfos.value;
              taskInfos.pullRequestName = selectedPrInfos.title;
              taskInfos.pullRequestStatus = selectedPrInfos.status;
            }

            const task = await axios
              .post("/api/task", taskInfos)
              .then((res) => res.data);

            onCreate(task);
            form.resetFields();
          })
          .catch((info) => console.log("Validate Failed:", info))
          .finally(() => stopLoading());
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public", date: dayjs().startOf('day') }}
      >
        <Form.Item
          name="title"
          label="Título"
          rules={[
            {
              required: true,
              message: "Por favor preencha o Título da tarefa!",
            },
          ]}
          style={{ marginBottom: 8 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descrição"
          style={{ marginBottom: 8 }}
        >
          <Input.TextArea placeholder="Descrição" />
        </Form.Item>

        <Form.Item
          name="pullRequest"
          label="Vincular Pull Request"
          style={{ marginBottom: 8 }}
        >
          <Select
            className="w-full"
            showSearch
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            options={prOptions}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="date" label="Data" style={{ marginBottom: 8 }}>
              <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="priority"
              label="Prioridade"
              style={{ marginBottom: 8 }}
            >
              <Select
                placeholder="Prioridade"
                style={{ width: "100%" }}
                popupMatchSelectWidth={false}
                options={priorityOptions}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default TasksCreateDialog;
