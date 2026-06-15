interface TaskCardProps {
    title: string;
    completed: boolean;
}

const TaskCard = ({title,completed}: TaskCardProps) => {
    return(
        <div className="flex items-center justify-between rounded-lg border p-4">
            <span>{title}</span>
            <span>{completed ? "✅" : "⏳"}</span>
        </div>
    );
};

export default TaskCard