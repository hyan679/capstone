import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, message, Radio, Typography } from "antd";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import { MenuOutlined, DownOutlined } from "@ant-design/icons";
import { arrayMoveImmutable } from "array-move";

import StatusLabel from "../../../components/StatusLabel";
import Header from "../../../components/Header";

import "./index.css";
import { getAgreementList, rankContract } from "../../../apis/http";
import { convertCurrency, relativeDate } from "../../../utils";

const { Text } = Typography;

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
));

const columns = [
  {
    title: "Sort",
    dataIndex: "sort",
    width: 30,
    className: "drag-visible",
    render: () => <DragHandle />,
  },
  {
    title: "Project Name",
    dataIndex: "title",
    className: "drag-visible",
  },
  {
    title: "Due Date",
    dataIndex: "end_date",
    className: "drag-visible",
    render: (date) => <Text>{relativeDate(date)}</Text>,
  },
  {
    title: "Budget",
    dataIndex: "estimated_budget",
    className: "drag-visible",
    render: (number) => <Text type="danger">{convertCurrency(number)}</Text>,
  },
  {
    title: "Status",
    dataIndex: "agr_state",
    className: "drag-visible",
    render: (status) => <StatusLabel value={status}></StatusLabel>,
  },
  {
    title: "Project Details",
    dataIndex: "project_id",
    className: "drag-visible",
    render: (id) => (
      <Button type="default">
        <Link to={`/director/project?id=${id}`}>View</Link>
      </Button>
    ),
  },
];

function ContractList() {
  const [dataSource, setDataSource] = useState([]);
  const [sortable, setSortable] = useState(0);
  const [loading, setLoading] = useState(false);
  const [contractStatusValue, setContractStatusValue] = useState("");

  useEffect(() => {
    setLoading(true);
    getAgreementList(contractStatusValue === "" ? null : contractStatusValue)
      .then((res) => {
        if (res) {
          setDataSource(res);
        }
      })
      .catch((err) => {
        message.error("Fail to read contracts");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [contractStatusValue]);

  function onSortEnd({ oldIndex, newIndex }) {
    const appId = dataSource[oldIndex].agreement_id;

    console.debug(
      "[Director.ContractList] Rank changed: (oldIndex, newIndex)",
      oldIndex,
      newIndex
    );

    let beforeId = null;
    let afterId = null;

    // down
    if (newIndex > oldIndex) {
      beforeId = dataSource[newIndex].agreement_id;
      if (newIndex < dataSource.length) {
        afterId = dataSource[newIndex].agreement_id;
      }
    }
    // up
    else if (oldIndex > newIndex) {
      afterId = dataSource[newIndex].agreement_id;
      if (newIndex > 0) {
        beforeId = dataSource[newIndex + 1].agreement_id;
      }
    } else {
      return;
    }

    console.log(
      `[Application.Rank] ApplicationId: ${appId}, before: ${beforeId}, after: ${afterId}`
    );
    setLoading(true);
    rankContract(appId, beforeId, afterId)
      .then((res) => {
        if (res && res.ok) {
          const newData = arrayMoveImmutable(
            [].concat(dataSource),
            oldIndex,
            newIndex
          ).filter((el) => !!el);
          setDataSource(newData);
          message.success("Priority changed successfully");
        }
      })
      .catch((err) => {
        message.error("Fail to rank priority");
      })
      .finally(() => {
        setLoading(false);
        setSortable(false);
      });
  }

  function DraggableContainer(props) {
    return (
      <SortableContainer
        useDragHandle
        disableAutoscroll
        helperClass="row-dragging"
        onSortEnd={onSortEnd}
        {...props}
      />
    );
  }

  function DraggableBodyRow({ className, style, ...restProps }) {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.agreement_id === restProps["data-row-key"]
    );
    return <SortableItem index={index} {...restProps} />;
  }
  const SortableItem = sortableElement((props) => <tr {...props} />);
  const SortableContainer = sortableContainer((props) => <tbody {...props} />);

  function handleSortable() {
    const value = sortable ? 0 : 1;
    setSortable(value);
  }

  function onSelectContractStatus(e) {
    setContractStatusValue(e.target.value);
  }

  return (
    <>
      <Header
        title="Contracts"
        actions={
          <div>
            <Button type="primary" size="large" onClick={handleSortable}>
              {sortable ? "Done" : "Prioritise"}
            </Button>
          </div>
        }
      ></Header>
      <div style={{ padding: "10px 0" }}>
        <span style={{ fontWeight: "600", paddingRight: "10px" }}>Filter:</span>
        <Radio.Group
          onChange={onSelectContractStatus}
          value={contractStatusValue}
        >
          <Radio value={""}>All</Radio>
          <Radio value={0}>To Be Submit</Radio>
          <Radio value={1}>Processing</Radio>
          <Radio value={2}>Approving</Radio>
          <Radio value={3}>Rejected</Radio>
          <Radio value={4}>Completed</Radio>
        </Radio.Group>
      </div>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={sortable ? columns : columns.slice(1)}
        rowKey="agreement_id"
        loading={loading}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </>
  );
}

export default ContractList;
