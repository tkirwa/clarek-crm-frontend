import React from 'react';
import SideBar from './SideBar';

const DashboardGrid: React.FC = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
                <div className="h-32 rounded-lg bg-gray-200">
                    <SideBar/>
                </div>
                <div className="h-32 rounded-lg bg-gray-200 lg:col-span-2"></div>
                <div className="h-32 rounded-lg bg-gray-200"></div>
            </div>
        </>
    );
}

export default DashboardGrid;
