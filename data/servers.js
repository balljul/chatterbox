const servers = {
    servers: {
        "server1": {
            id: "server1",
            name: "Gaming Hub",
            adminId: "user2",
            motto: "Play, Connect, Win!",
            description: "Your ultimate gaming community",
            channels: {
                "channel1": {
                    id: "channel1",
                    name: "general",
                    description: "General gaming discussion",
                    moderatorIds: ["user2", "user3"]
                },
                "channel2": {
                    id: "channel2",
                    name: "fps-games",
                    description: "FPS games discussion and team finder",
                    moderatorIds: ["user4"]
                },
                "channel3": {
                    id: "channel3",
                    name: "minecraft",
                    description: "All things Minecraft",
                    moderatorIds: ["user5"]
                },
                "channel4": {
                    id: "channel4",
                    name: "esports",
                    description: "Esports tournaments and news",
                    moderatorIds: ["user2"]
                }
            }
        },
        "server2": {
            id: "server2",
            name: "Dev Central",
            adminId: "user1",
            motto: "Code. Review. Deploy.",
            description: "A place for developers to collaborate",
            channels: {
                "channel5": {
                    id: "channel5",
                    name: "general",
                    description: "General development chat",
                    moderatorIds: ["user1", "user8"]
                },
                "channel6": {
                    id: "channel6",
                    name: "frontend",
                    description: "Frontend development discussions",
                    moderatorIds: ["user5"]
                },
                "channel7": {
                    id: "channel7",
                    name: "backend",
                    description: "Backend development discussions",
                    moderatorIds: ["user1"]
                },
                "channel8": {
                    id: "channel8",
                    name: "devops",
                    description: "DevOps and deployment discussions",
                    moderatorIds: ["user7"]
                }
            }
        },
        "server3": {
            id: "server3",
            name: "Creative Corner",
            adminId: "user6",
            motto: "Design. Create. Inspire.",
            description: "Community for designers and artists",
            channels: {
                "channel9": {
                    id: "channel9",
                    name: "general",
                    description: "General design discussion",
                    moderatorIds: ["user6", "user5"]
                },
                "channel10": {
                    id: "channel10",
                    name: "ui-ux",
                    description: "UI/UX design discussions",
                    moderatorIds: ["user5"]
                },
                "channel11": {
                    id: "channel11",
                    name: "digital-art",
                    description: "Digital art and illustrations",
                    moderatorIds: ["user6"]
                },
                "channel12": {
                    id: "channel12",
                    name: "resources",
                    description: "Design resources and tools",
                    moderatorIds: ["user5"]
                }
            }
        }
    }
};

module.exports = { servers };
