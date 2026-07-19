import css from "./SearchBox.module.css";

interface SearchBoxProps{
  query: string
  onSearch: (nextSearchQuery : string) => void;
  setPage: (page: number)=> void;
}

export default function SearchBox({query, onSearch, setPage}: SearchBoxProps){

function handleChange(event : React.ChangeEvent<HTMLInputElement>){
onSearch(event.target.value);
setPage(1)
};
    return(
        <div className={css.container}>
          <input
            className={css.input}
            type="text"
            name="query"
            defaultValue={query}
            autoComplete="off"
            placeholder="Search notes"
            autoFocus
            onChange={handleChange}
          />
      </div>
    )
}