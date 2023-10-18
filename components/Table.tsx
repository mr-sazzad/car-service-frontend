import { Table } from "antd";

interface UMTableProps {
  loading?: boolean;
  columns: any;
  dataSource: any;
}

const MyTable = ({
  columns,
  loading = false,
  dataSource,
}: UMTableProps) => {
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
    />
  );
};

export default MyTable;
