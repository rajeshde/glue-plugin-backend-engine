export default class NginxConf {
    data: any[];
    constructor();
    generate(): Promise<void>;
    build(): Promise<void>;
    addRouter(string: string): Promise<boolean>;
    private toConf;
    private toBuildConf;
}
