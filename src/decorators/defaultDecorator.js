import Link from "../components/Link";
import {CompositeDecorator} from "draft-js";
import {createTypeStrategy} from "../utils";

const decorator = new CompositeDecorator([
    {
        strategy: createTypeStrategy("LINK"),
        component: Link
    }
]);

export default decorator;
