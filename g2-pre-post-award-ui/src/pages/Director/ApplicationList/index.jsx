import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Dropdown,
  Menu,
  message,
  Radio,
  Typography,
} from "antd";
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
import { getApplicationList, rankApplication } from "../../../apis/http";
import { convertCurrency } from "../../../utils";

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
    title: "Budget",
    dataIndex: "estimated_budget",
    className: "drag-visible",
    render: (number) => <Text type="danger">{convertCurrency(number)}</Text>,
  },
  {
    title: "Status",
    dataIndex: "app_state",
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

function ApplicationList() {
  const [dataSource, setDataSource] = useState([]);
  const [sortable, setSortable] = useState(0);
  const [loading, setLoading] = useState(false);
  const [applicationStatusValue, setApplicationStatusValue] = useState("");

  useEffect(() => {
    setLoading(true);
    getApplicationList(applicationStatusValue)
      .then((res) => {
        setDataSource(res);
      })
      .catch((err) => {
        // message.error("Fail to get applcaitons")
      })
      .finally(() => {
        setLoading(false);
      });
  }, [applicationStatusValue]);

  function onSortEnd({ oldIndex, newIndex }) {
    const appId = dataSource[oldIndex].application_id;
    console.log(
      "[Director.ApplicationList] Rank changed: (appId, oldIndex, newIndex)",
      appId,
      oldIndex,
      newIndex
    );

    let beforeId = null;
    let afterId = null;

    // down
    if (newIndex > oldIndex) {
      beforeId = dataSource[newIndex].application_id;
      if (newIndex < dataSource.length) {
        afterId = dataSource[newIndex].application_id;
      }
    }
    // up
    else if (oldIndex > newIndex) {
      afterId = dataSource[newIndex].application_id;
      if (newIndex > 0) {
        beforeId = dataSource[newIndex + 1].application_id;
      }
    } else {
      return;
    }

    console.log(
      `[Application.Rank] ApplicationId: ${appId}, before: ${beforeId}, after: ${afterId}`
    );
    setLoading(true);
    rankApplication(appId, beforeId, afterId)
      .then((res) => {
        if (res && res.ok) {
          const newData = arrayMoveImmutable(
            [].concat(dataSource),
            oldIndex,
            newIndex
          ).filter((el) => !!el);
          console.log("Sorted items: ", newData);
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
      (x) => x.application_id === restProps["data-row-key"]
    );
    return <SortableItem index={index} {...restProps} />;
  }
  const SortableItem = sortableElement((props) => <tr {...props} />);
  const SortableContainer = sortableContainer((props) => <tbody {...props} />);

  function handleSortable() {
    const value = sortable ? 0 : 1;
    setSortable(value);
  }

  function onSelectApplicationStatus(e) {
    setApplicationStatusValue(e.target.value);
  }
  return (
    <>
      <Header
        title="Applications"
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
          onChange={onSelectApplicationStatus}
          value={applicationStatusValue}
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
        rowKey="application_id"
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

export default ApplicationList;
