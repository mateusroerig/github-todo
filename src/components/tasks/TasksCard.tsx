import {
  Card,
  Radio,
  Button,
  Typography,
  Input,
  Select,
  DatePicker,
  message,
  Modal,
} from "antd";
import {
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import PullRequestSection from "@/components/tasks/PullRequestSection";
import { useState } from "react";
import dayjs from "dayjs";

import "./tasks.css";
import { Task } from "@prisma/client";
import { priorityOptions } from "@/utils/constants";

interface TaskCardProps {
  task: Task;
  duplicateTask: (id: number) => any;
  deleteTask: (id: number) => void;
  updateTask: (updatedTask: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  duplicateTask,
  updateTask,
  deleteTask,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [taskCopy, setTaskCopy] = useState<Task>(task);
  const [isCompleted, setIsCompleted] = useState(task.completed || false);

  const handleCompletionChange = (e: any) => {
    const completed = !task.completed;
    setIsCompleted(completed);
    updateTask({ ...task, completed });

    if (completed) {
      message.success("Tarefa concluída com sucesso!", 1);
    } else {
      message.info("Tarefa marcada como pendente.", 1);
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (!expanded) {
      setTaskCopy({ ...task });
    }
  };

  const prOptions = [
    { value: "login-page", label: "login-page" },
    { value: "config-page", label: "config-page" },
    { value: "dashboard-page", label: "dashboard-page" },
  ];

  const handleSearch = (value: string) => {
    console.log("search:", value);
  };

  const saveChanges = () => {
    updateTask(taskCopy);
    setExpanded(false);
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Você tem certeza que deseja excluir essa tarefa?",
      icon: <ExclamationCircleFilled />,
      content: "Essa ação não poderá ser desfeita!",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteTask(task.id);
      },
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTaskCopy({ ...taskCopy, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setTaskCopy({ ...taskCopy, [name]: value });
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setTaskCopy({ ...taskCopy, date: date.toDate() });
    }
  };

  return (
    <Card size="small" hoverable className="hover:shadow-lg">
      <div className="task-content">
        {isCompleted}
        <Radio checked={isCompleted} onClick={handleCompletionChange} />
        <div style={{ flex: 1 }}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {task.title}
          </Typography.Title>
          {(!expanded || !task.description) && (
            <Typography.Text style={{ margin: 0 }}>
              {task.description}
            </Typography.Text>
          )}
        </div>

        {!expanded && (
          <>
            {task.pullRequestName && task.pullRequestStatus && (
              <PullRequestSection
                name={task.pullRequestName}
                status={task.pullRequestStatus}
              />
            )}
            <Button
              type="default"
              shape="circle"
              icon={<EditOutlined />}
              onClick={toggleExpanded}
            />
            <Button
              type="default"
              shape="circle"
              icon={<CopyOutlined />}
              onClick={() => duplicateTask(task.id)}
            />
          </>
        )}
      </div>

      <div>
        {expanded && (
          <div className="pt-2 w-full flex flex-col gap-4">
            <Input.TextArea
              placeholder="Descrição"
              defaultValue={taskCopy.description || undefined}
              onChange={handleInputChange}
              name="description"
            />

            <div className="flex flex-col gap-4">
              <div className="flex gap-2 justify-end">
                <Select
                  className="w-full"
                  showSearch
                  defaultValue={taskCopy.pullRequestName}
                  placeholder="Vincular Pull Request"
                  defaultActiveFirstOption={false}
                  suffixIcon={null}
                  filterOption={false}
                  onSearch={handleSearch}
                  options={prOptions}
                  onChange={(value) => handleSelectChange(value, "pullRequest")}
                />

                <DatePicker
                  style={{ minWidth: 120 }}
                  defaultValue={dayjs(taskCopy.date)}
                  format={"DD/MM/YYYY"}
                  onChange={handleDateChange}
                />

                <Select
                  placeholder="Prioridade"
                  style={{ minWidth: 120 }}
                  popupMatchSelectWidth={false}
                  defaultValue={taskCopy.priority}
                  options={priorityOptions}
                  onChange={(value) => handleSelectChange(value, "priority")}
                />
                <div className="flex ml-4 gap-2">
                  <Button type="primary" onClick={saveChanges}>
                    Salvar
                  </Button>
                  <Button type="default" onClick={toggleExpanded}>
                    Fechar
                  </Button>
                  <Button
                    type="default"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={showDeleteConfirm}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
