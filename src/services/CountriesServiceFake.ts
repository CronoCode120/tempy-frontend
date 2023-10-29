export class CountriesServiceFake {
    async getCountries() {
        return [
            {
                name: "España",
                ip: "103.202.235.255",
            },
            {
                name: "Francia",
                ip: "1.1.1.1",
            },
            {
                name: "Portugal",
                ip: "2.2.2.2",
            },
        ];
    }
}
