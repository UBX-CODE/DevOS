interface StatsCardProps {
    title: string;
    value: number;
}

const StatsCard = ({ title, value }: StatsCardProps) => {
    return (
        <div className="rounded-xl border p-5 shadow-sm">
            <h3 className="text-sm text-gray-500">
                {title}
            </h3>

            <p className="mt-2 text-3xl font-bold">
                {value}
            </p>
        </div>
    );
};

export default StatsCard;