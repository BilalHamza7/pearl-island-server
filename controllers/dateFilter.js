export const dateFilter = async (date) => {
    const filteredDate = {};
    const now = new Date();

    try {
        switch (date) {
            case 'new-to-old':
                filteredDate.sortedDate = { date: -1 };
                break;
            case 'old-to-new':
                filteredDate.sortedDate = { date: 1 };
                break;
            case 'this-week':
                const startWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                const endWeek = new Date(now.setDate(startWeek.getDate() + 7));
                filteredDate.date = { $gte: startWeek, $lt: endWeek };
                break;
            case 'this-month':
                const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                filteredDate.date = { $gte: startMonth, $lt: endMonth };
                break;
            case 'this-year':
                const startYear = new Date(now.getFullYear(), 0, 1);
                const endYear = new Date(now.getFullYear() + 1, 0, 1);
                filteredDate.date = { $gte: startYear, $lt: endYear };
                break;
            default:
                break;
        }
        return filteredDate;
    } catch (error) {
        console.error(error);
        return 'Could Not Filter Date';
    }

}