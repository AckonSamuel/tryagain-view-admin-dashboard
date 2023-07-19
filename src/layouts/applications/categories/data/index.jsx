import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import CategoryActions from "../category-actions";

const Data = () => {
  const { category } = useSelector((state) => state.categoryFetch, shallowEqual);
  const categoryData = () =>
    category.map((item) => ({
      category_name: item.attributes.category_name,
      description: item.attributes.category_description,
      action: <CategoryActions id={item.id} />,
    }));

  return {
    columns: [
      { Header: "category", accessor: "category_name", width: "20%", align: "left" },
      { Header: "description", accessor: "description", width: "70%", align: "left" },
      { Header: "action", accessor: "action", align: "left" },
    ],

    rows: categoryData(),
  };
};

export default Data;
