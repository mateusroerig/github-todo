import { PlusOutlined } from "@ant-design/icons";
import { Empty, FloatButton } from "antd";

export default function Dashboard() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)]">
      <Empty />
      <FloatButton type="primary" icon={<PlusOutlined />} />
    </div>
  );
}
