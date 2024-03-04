import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";

type Props = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

const SearchBar = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className={"relative w-3/4"}>
      {/*Input field*/}
      <input
        type="text"
        id="table-filter"
        className="w-full ps-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        value={searchTerm}
        required
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      {/*Search icon*/}
      <div className="absolute left-0 top-0 mt-2 ml-3 h-10">
        <FontAwesomeIcon
          icon={faSearch}
          className={"text-gray-500"}
          size={"lg"}
        />
      </div>
    </div>
  );
};

export default SearchBar;
