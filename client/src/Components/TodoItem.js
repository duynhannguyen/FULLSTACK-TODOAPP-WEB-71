const TodoItem = (props) => {
  const { _id, TaskTitle, isCompleted, DeleteId, EditId, onChecked } =
    props || {};

  return (
    <div id={_id} className="todoitem">
      {TaskTitle}
      <p className="tool">
        <div
          className={`${
            isCompleted === false ? "check-wrapper" : "check-wrapper-complete"
          }`}
        >
          <input
            className="check-box"
            type="checkbox"
            checked={isCompleted}
            onChange={() => onChecked(_id)}
          ></input>
        </div>
        <div className="trash-can-wrapper">
          <i
            id="trash-can"
            className="fa-solid fa-trash-can"
            onClick={() => DeleteId(_id)}
            // onDeleteHandler(id)
          ></i>
        </div>
        <div className="edit-wrapper">
          <i
            id="edit"
            className="fa-solid fa-pen-to-square"
            onClick={() => EditId(_id)}
          ></i>
        </div>
      </p>
    </div>
  );
};
export default TodoItem;
