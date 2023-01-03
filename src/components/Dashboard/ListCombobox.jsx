/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useGetListsQuery } from '../../api/booksApi';

const ListCombobox = ({ setSelectedList, selectedList }) => {
    const [query, setQuery] = useState('');
    const { user } = useSelector((state) => state.auth);
    const { data: lists } = useGetListsQuery(user.username);

    const filteredLists = lists
        ? query === ''
            ? lists
            : lists?.filter((list) => {
                  return list.title
                      .toLowerCase()
                      .replace(/\s+/g, '')
                      .includes(query.toLowerCase().replace(/\s+/g, ''));
              })
        : [];

    return (
        <Combobox value={selectedList} onChange={setSelectedList}>
            <div className="relative z-10 mb-3">
                <div className="relative w-full cursor-default text-left sm:text-sm">
                    <label className="sr-only" htmlFor="list">
                        Add to a List
                    </label>
                    <Combobox.Input
                        className="w-full h-9 border-gray-300 rounded-sm py-2 pl-3 pr-10 text-gray-900"
                        displayValue={(list) => list.title}
                        onKeyDown={(e) => {
                            if (
                                e.key === 'Escape' ||
                                (e.key === 'Backspace' && query.length === 1) ||
                                (e.key === 'Backspace' && query === '')
                            ) {
                                setSelectedList('');
                            }
                        }}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Add to a List"
                        id="list"
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => {
                        setQuery('');
                    }}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {/* <button
                            onClick={() => {}}
                            className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900"
                        >
                            + New List
                        </button>
                        {showForm && (
                            <form
                                id="list-form"
                                className="flex flex-col mb-4 p-3"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <label className="sr-only" htmlFor="title">
                                    List Title
                                </label>
                                <FormInput
                                    {...register('title', { required: 'Please add a valid title' })}
                                    id="title"
                                    type="text"
                                    errors={errors.title}
                                    placeholder="List Title"
                                    form="list-form"
                                />
                                <button
                                    className="flex items-center justify-center rounded-sm text-sm text-white bg-blue-600 px-5 py-2"
                                    type="submit"
                                >
                                    Create List
                                </button>
                            </form>
                        )} */}
                        {filteredLists?.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            <>
                                {filteredLists?.map((list) => (
                                    <Combobox.Option
                                        key={list._id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-blue-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={list}
                                    >
                                        {({ selectedList, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selectedList ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {list.title}
                                                </span>
                                                {selectedList ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active ? 'text-white' : 'text-blue-600'
                                                        }`}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))}
                            </>
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
};

export default ListCombobox;
