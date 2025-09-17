import React, { useState, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Input } from "antd";
import { toggleObjectSelection } from "../redux/store";

const { Search } = Input;

// Hàm đệ quy để render các node trong cây
const renderTreeNodes = (nodes, selectedObjects, dispatch, searchText) => {
  if (!nodes) return null;

  // Lọc các node con
  const filteredNodes = nodes.filter((node) => {
    const isMatch = node.name.toLowerCase().includes(searchText.toLowerCase());
    // Kiểm tra nếu có node con nào khớp với tìm kiếm
    const hasMatchingChild =
      node.children &&
      node.children.some(
        (child) => renderTreeNodes([child], selectedObjects, dispatch, searchText) // kiểm tra đệ quy
      );
    // Hiển thị node nếu tên khớp hoặc có node con khớp
    return isMatch || hasMatchingChild;
  });

  return filteredNodes.map((node) => {
    const isSelected = selectedObjects.includes(node.uuid);

    if (node.isMesh) {
      // Chỉ render các mesh nếu tên của chúng khớp với tìm kiếm
      if (node.name.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <div key={node.uuid} style={{ paddingLeft: "20px" }}>
            <Checkbox checked={isSelected} onChange={() => {
              dispatch(toggleObjectSelection({ objectUuid: node.uuid }));
            }}>
              {node.name}
            </Checkbox>
          </div>
        );
      }
      return null; // Không hiển thị nếu không khớp
    }

    // Nếu là một group, render tên group và các node con đã được lọc
    return (
      <div key={node.uuid}>
        <h4>{node.name}</h4>
        {node.children.length > 0 && renderTreeNodes(node.children, selectedObjects, dispatch, searchText)}
      </div>
    );
  });
};

export default function ObjectTree({ modelPath }) {
  const { nodes } = useGLTF(modelPath);
  const selectedObjects = useSelector((state) => state.selection.selectedObjects);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  // Chuyển đối tượng nodes thành mảng để dễ dàng xử lý
  const nodesArray = useMemo(() => Object.values(nodes), [nodes]);

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", maxHeight: "500px", overflowY: "auto" }}>
      <h3>Object Tree</h3>
      <Search placeholder="Tìm kiếm đối tượng..." onChange={(e) => setSearchText(e.target.value)} style={{ marginBottom: "10px" }} />
      {renderTreeNodes(nodesArray, selectedObjects, dispatch, searchText)}
    </div>
  );
}
