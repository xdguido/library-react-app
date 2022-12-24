import React, { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const genres = [
    'None',
    'Science fiction',
    'Historical fiction',
    'Adventures',
    'Fantasy',
    'Drama',
    'Poetry',
    'Prose',
    'Mystery',
    'Horror',
    'Thriller',
    'Romance',
    'Western',
    'Dystopian',
    'Contemporary',
    'Memoir',
    'Cookbook',
    'Art',
    'Tech',
    'Finances',
    'Self-help',
    'Motivational',
    'Health',
    'History',
    'Travel',
    'How-to',
    'Humor',
    'Technical',
    'Magazine',
    'Journal',
    'Newspaper'
];

const GenreCombobox = React.forwardRef(function GenreCombobox(props, ref) {
    const { ...inputProps } = props;
    const [selectedGenre, setSelectedGenre] = useState('');
    const [query, setQuery] = useState('');

    const filteredGenres = genres
        ? query === ''
            ? genres
            : genres?.filter((genre) => {
                  return genre
                      .toLowerCase()
                      .replace(/\s+/g, '')
                      .includes(query.toLowerCase().replace(/\s+/g, ''));
              })
        : [];

    return (
        <Combobox value={selectedGenre} onChange={setSelectedGenre}>
            <div className="relative z-10 mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <label className="sr-only" htmlFor="genre">
                        Select book genre
                    </label>
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(genre) => genre}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Select a Genre"
                        id="genre"
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
                        {filteredGenres?.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            <>
                                {filteredGenres?.map((genre) => (
                                    <Combobox.Option
                                        key={genre}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-blue-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={genre}
                                    >
                                        {({ selectedGenre, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selectedGenre
                                                            ? 'font-medium'
                                                            : 'font-normal'
                                                    }`}
                                                >
                                                    {genre}
                                                </span>
                                                {selectedGenre ? (
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

export default GenreCombobox;
