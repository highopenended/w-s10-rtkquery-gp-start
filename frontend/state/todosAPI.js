import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
    reducerPath:'todosApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:9009/api/'}),
    tagTypes: ['Todos'],
    endpoints: build=>({
        getTodos: build.query({
            query: () => 'todos',
            providesTags:['Todos'] // successful get attaches this tag to the data
        }),
        toggleTodo: build.mutation({
            query:({id, todo}) => ({
                url: `todos/${id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags:['Todos'] // successful PUT invalidates any data that has this tag and trigger refetch
        }),
        createTodo: build.mutation({
            query: todo => ({
                url:'todos',
                method:'POST',
                body:todo
            }),
            invalidatesTags:['Todos'] // successful PUT invalidates any data that has this tag and trigger refetch
        })
    })
})

export default todosApi
export const {
    useGetTodosQuery, useToggleTodoMutation, useCreateTodoMutation
} = todosApi