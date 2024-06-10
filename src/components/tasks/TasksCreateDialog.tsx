import { Modal, Form, Input, Select, DatePicker, Button, Row, Col } from 'antd';
import { tasksService } from '@/services/tasks.service';
import dayjs from 'dayjs';

interface TasksCreateDialogProps {
  open: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
}

const TasksCreateDialog: React.FC<TasksCreateDialogProps> = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const priorityOptions = [
    { value: 'none', label: 'Nenhuma'},
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
    { value: 'urgent', label: 'Urgente'}
  ];

  const prOptions = [
    { value: 'login-page', label: 'login-page' },
    { value: 'config-page', label: 'config-page' },
    { value: 'dashboard-page', label: 'dashboard-page' },
  ];

  const handleSearch = (value: string) => {
    console.log('search:', value);
  }

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
          .then(values => {
            tasksService.create({ 
              ...values, 
              date: dayjs(values.date).format('DD/MM/YYYY'),
              id: Math.floor(Math.random() * 1000) + 1
            });

            onCreate(values);
            form.resetFields();
          })
          .catch(info => console.log('Validate Failed:', info));
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: 'Por favor preencha o Título da tarefa!' }]}
          style={{ marginBottom: 8 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descrição"
          rules={[{ required: true, message: 'Por favor preencha a descrição!' }]}
          style={{ marginBottom: 8 }}
        >
          <Input.TextArea placeholder="Descrição" />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Prioridade"
          rules={[{ required: true, message: 'Por favor adicione um nivel de Prioridade!' }]}
          style={{ marginBottom: 8 }}
        >
          <Input />
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
            <Form.Item
              name="date"
              label="Data"
              style={{ marginBottom: 8 }}
            >
              <DatePicker 
                style={{ width: '100%' }}
                format={'DD/MM/YYYY'} 
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="prioritySelect"
              label="Prioridade"
              style={{ marginBottom: 8 }}
            >
              <Select
                placeholder="Prioridade"
                style={{ width: '100%' }}
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