"use server";
import { getEmbedApp } from "@src/server/embedchain/get-embed-app";
import { LLMResponse } from "@src/server/embedchain/llms/types";
import { DataType, Input } from "@src/server/embedchain/models";
import { QueryOptions } from "@src/server/embedchain/models/QueryOptions";
import { forceArray } from "@src/utilities/force-array";

export async function addContent(type: DataType, data: Input | Input[], name?: string): Promise<void> {
    const app = await getEmbedApp(name);
    if (app == null) {
        throw "Embed app is null";
    }
    await app.add({ data: data, dataType: type });
}

export async function clearCollection(name: string): Promise<void> {
    const app = await getEmbedApp(name);
    if (app == null) {
        throw "Embed app is null";
    }
    await app.deleteData();
}

export type SearchQueryResponse = {
    query: string;
    gptPrompt?: string;
    context?: any;
    content?: string;
    price?: number;
};

export async function queryContent(
    query: string,
    notes?: string[] | string | undefined | QueryOptions,
    name?: string,
    nResults: number = 2
): Promise<LLMResponse> {
    const app = await getEmbedApp(name);
    if (app == null) {
        throw "Embed app is null";
    }
    const queryOptions: QueryOptions = {};

    if (typeof notes == "object" && notes != null && !Array.isArray(notes)) {
        for (const i in notes) {
            (queryOptions as any)[i] = (notes as any)[i];
        }
    } else {
        queryOptions.additionalContext = forceArray(notes);
    }

    queryOptions.relatedResults = queryOptions.relatedResults ?? nResults ?? 2;
    return app.query(query, queryOptions);
}
