import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Todo from '@/Components/Todo';

dayjs.extend(relativeTime);

export default function Index({ auth, todos }) {


    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("todos.store"), { onSuccess: () => reset() });
    };

    // Filter the todos array to only include todos belonging to the current user
    const userTodos = todos.filter(todo => todo.user_id === auth.user.id);

    const [filter, setFilter] = useState('all'); //filter function

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Todos" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-200">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('message', e.target.value)}
                    >
                    </textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" processing={processing.toString(processing)}>Add Todo</PrimaryButton>
                </form>

                <div className='mt-5 flex justify-end'>
                    <label className="font-bold text-teal-700">Filter:</label>
                    <select className='text-sm p-1 ml-2 text-teal-700' value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="done">Done</option>
                        <option value="not-done">Not Done</option>
                    </select>
                </div>
                <div className="mt-6 bg-gray-300 shadow-sm rounded-lg divide-y">
                    {todos && Array.isArray(userTodos) && userTodos.map((todo) => (
                        <Todo key={todo.id} todo={todo} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}