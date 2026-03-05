import { useBoardStore } from "@/store/boardStore";
import Column from "./Column";

export default function Board() {
  const columnOrder = useBoardStore((state) => state.columnOrder);
  const columns = useBoardStore((state) => state.columns);

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {columnOrder.map((columnId) => {
        const column = columns[columnId];

        return <Column key={column.id} column={column} />;
      })}
    </div>
  );
}
