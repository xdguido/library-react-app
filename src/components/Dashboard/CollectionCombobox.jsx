/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useGetCollectionsQuery } from '../../api/booksApi';

const CollectionCombobox = ({ setSelectedCollection, selectedCollection }) => {
    const [query, setQuery] = useState('');
    const { user } = useSelector((state) => state.auth);
    const { data: collections } = useGetCollectionsQuery(user.username);

    const filteredCollections = collections
        ? query === ''
            ? collections
            : collections?.filter((collection) => {
                  return collection.title
                      .toLowerCase()
                      .replace(/\s+/g, '')
                      .includes(query.toLowerCase().replace(/\s+/g, ''));
              })
        : [];

    return (
        <Combobox value={selectedCollection} onChange={setSelectedCollection}>
            <div className="relative z-10 mb-3">
                <div className="relative w-full cursor-default text-left sm:text-sm">
                    <label className="sr-only" htmlFor="collection">
                        Add to a Collection
                    </label>
                    <Combobox.Input
                        className="w-full h-9 border-gray-300 rounded-sm py-2 pl-3 pr-10 text-gray-900"
                        displayValue={(collection) => collection.title}
                        onKeyDown={(e) => {
                            if (
                                e.key === 'Escape' ||
                                (e.key === 'Backspace' && query.length === 1) ||
                                (e.key === 'Backspace' && query === '')
                            ) {
                                setSelectedCollection('');
                            }
                        }}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Add to a Collection"
                        id="collection"
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
                            + New Collection
                        </button>
                        {showForm && (
                            <form
                                id="list-form"
                                className="flex flex-col mb-4 p-3"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <label className="sr-only" htmlFor="title">
                                    Collection Title
                                </label>
                                <FormInput
                                    {...register('title', { required: 'Please add a valid title' })}
                                    id="title"
                                    type="text"
                                    errors={errors.title}
                                    placeholder="Collection Title"
                                    form="list-form"
                                />
                                <button
                                    className="flex items-center justify-center rounded-sm text-sm text-white bg-blue-600 px-5 py-2"
                                    type="submit"
                                >
                                    Create Collection
                                </button>
                            </form>
                        )} */}
                        {filteredCollections?.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            <>
                                {filteredCollections?.map((collection) => (
                                    <Combobox.Option
                                        key={collection._id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-blue-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={collection}
                                    >
                                        {({ selectedCollection, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selectedCollection
                                                            ? 'font-medium'
                                                            : 'font-normal'
                                                    }`}
                                                >
                                                    {collection.title}
                                                </span>
                                                {selectedCollection ? (
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

export default CollectionCombobox;
