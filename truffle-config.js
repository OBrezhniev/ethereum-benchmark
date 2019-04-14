module.exports = {
    networks: {
        development: {
            host: "localhost",
            gas: 5800000,
            port: 8545,
            from: "0x6e5b08e9087e2c9968f2df6e271996d4adb13e95",
            network_id: 3,
            solc: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        },

        quorum: {
            host: "172.16.239.11",
            port: 8545,
            gas: 5800000,
            from: "0xed9d02e382b34818e88b88a309c7fe71e65f419d",
            network_id: "10",
            gasPrice: 0
        },

        geth_dev: {
            host: "172.25.0.110",
            port: 8545,
            gas: 3800000,
            network_id: "6660001"
        }
    }
};
