import React, { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useGetCollectionsQuery } from '../../api/booksApi';

// const collections = [
//     { _id: 1, name: 'Asd1' },
//     { _id: 2, name: 'Asd2' },
//     { _id: 3, name: 'Asd3' },
//     { _id: 4, name: 'Asd4' },
//     { _id: 5, name: 'Asd5' }
// ];

const CollectionCombobox = React.forwardRef(function CollectionCombobox(props, ref) {
    const { ...inputProps } = props;
    const [selectedCollection, setSelectedCollection] = useState('');
    const [query, setQuery] = useState('');
    const { data: collections } = useGetCollectionsQuery();

    const filteredCollections = collections
        ? query === ''
            ? collections
            : collections?.filter((collection) => {
                  return collection.name
                      .toLowerCase()
                      .replace(/\s+/g, '')
                      .includes(query.toLowerCase().replace(/\s+/g, ''));
              })
        : [];

    return (
        <Combobox value={selectedCollection} onChange={setSelectedCollection}>
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <label className="sr-only" htmlFor="collection">
                        Add to a Collection
                    </label>
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(collection) => collection.name}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Add to a Collection"
                        id="collection"
                        ref={ref}
                        {...inputProps}
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
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredCollections?.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            <>
                                <button className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900">
                                    New Collection +
                                </button>
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
                                                    {collection.name}
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
});

export default CollectionCombobox;
