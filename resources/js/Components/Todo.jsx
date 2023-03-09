// import React from 'react';
import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm, usePage } from '@inertiajs/react';


export default function Todo({ todo }) {

    const [done, setDone] = useState(todo.done); //Variable for mark as done function

    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: todo.message,
        done: todo.done,
    });


    const submit = (e) => {
        e.preventDefault();
        patch(route('todos.update', todo.id), {
            onSuccess: () => setEditing(false),
            data: {
                message: data.message,
            }
        });
    };

    const markAsDone = (done) => {
        setDone((d) => !d)
        patch(route('todos.update', todo.id));
    };


    return (
        <div className="p-6 flex flex-col space-x-2 bg-white border border-black mt-2">
            <div className='flex justify-between'>
                <span className='text-black border border-black p-2 max-w-fit' >
                    {todo.user.name}
                </span>

            </div>

            <div className='flex mt-2 justify-between'>
                <div className=''>🖋️ Todos</div>
                <span
                    className="text-gray-800 flex flex-row justify-between">

                    <small className="text-sm text-gray-600">
                        {new Date(todo.created_at).toLocaleString()}
                    </small>
                </span>
            </div>



            <div className="flex-1">
                <div className="flex justify-between ml-2items-center">

                    {todo.user.id === auth.user.id &&
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div>
                                    <h1>Edit</h1>
                                    <button className='ml-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                </div>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                                <Dropdown.Link as="button" href={route('todos.destroy', todo.id)} method="delete">
                                    Delete
                                </Dropdown.Link>

                                <button
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    onClick={() => {
                                        markAsDone(!done);
                                    }}
                                >
                                    {done ? 'Mark as undone' : 'Mark as done'}
                                </button>
                            </Dropdown.Content>
                        </Dropdown>
                    }
                </div>
                {editing
                    ? <form onSubmit={submit}>
                        <textarea value={data.message} onChange={e => setData('message', e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                        <InputError message={errors.message} class="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                        </div>
                    </form>
                    : <p className={`mt-2 text-lg text-black-600 font-semibold ${done ? 'line-through text-gray-500' : 'text-gray-900'}`}>{todo.message}</p>
                }
                <div>
                    {todo.created_at !== todo.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}
                </div>
            </div>
        </div>
    );
}