// components/ui/userCard.tsx
import React from "react";
import { Card } from "@/components/ui/card";

interface UserCardProps {
    username: string;
    email: string;
    phoneNumber?: string;
    address: string;
    role: "ADMIN" | "USER";
}

const UserCard: React.FC<UserCardProps> = ({
                                               username,
                                               email,
                                               phoneNumber,
                                               address,
                                               role,
                                           }) => {
    return (
        <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-200 w-full max-w-lg">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* User Details (Left Side) */}
                <div className="flex-1 space-y-3">
                    <div>
                        <p className="text-sm text-gray-500">Username</p>
                        <p className="font-medium text-gray-900">{username}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">{email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">
                            {phoneNumber || "Not provided"}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium text-gray-900">{address}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="font-medium text-gray-900">{role}</p>
                    </div>
                </div>

                {/* Profile Picture Placeholder (Right Side) */}
                <div className="flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        {/* Empty circle as placeholder */}
                        <span>No Image</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default UserCard;