// Window large lists with react-virtual
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
// 🐨 import the useVirtual hook from react-virtual
import {useVirtual} from 'react-virtual'
import {useCombobox} from '../use-combobox'
import {getItems} from '../workerized-filter-cities'
import {useAsync, useForceRerender} from '../utils'

const getVirtualRowStyles = ({size, start}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: size,
  transform: `translateY(${start}px)`,
})

function Menu({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
  // 🐨 accept listRef, virtualRows, totalHeight
  listRef,
  virtualRows,
  totalHeight
}) {
  return (
    // 🐨 pass the listRef to the `getMenuProps` prop getter function below:
    <ul {...getMenuProps({ref: listRef})}>
      {/* 🐨 add a li here with an inline style for the height set to the totalHeight */}
      <li key={items.id} style={{height: totalHeight}} />
      {/* 🐨 swap `items` with `virtualRows` */}
      {/*
        💰 a virtual row is an object with the following properties:
        - index: you can use this to get the `item` via `items[index]`
        - size: set the "height" style to this value
        - start: this is how many pixels from the scrollTop this item should be
      */}
      {virtualRows.map((item, index, size, start) => (
        <ListItem
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          isSelected={selectedItem?.id === item.id}
          isHighlighted={highlightedIndex === index}
          // 🐨 pass a style prop, you can get the inline styles from getVirtualRowStyles()
          // make sure to pass an object with the size (the height of the row)
          // and start (where the row starts relative to the scrollTop of its container).
          style={getVirtualRowStyles({size, start})}

        >
          {item.name}
        </ListItem>
      ))}
    </ul>
  )
}

function ListItem({
  getItemProps,
  item,
  index,
  isHighlighted,
  isSelected,
  // 🐨 accept the style prop
  style,
  ...props
}) {
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
          fontWeight: isSelected ? 'bold' : 'normal',
          // 🐨 spread the incoming styles onto this inline style object
          ...style
        },
        ...props,
      })}
    />
  )
}

function App() {
  const forceRerender = useForceRerender()
  const [inputValue, setInputValue] = React.useState('')

  const {data: items, run} = useAsync({data: [], status: 'pending'})
  React.useEffect(() => {
    run(getItems(inputValue))
  }, [inputValue, run])

  // 🐨 create a listRef with React.useRef
  const listRef = React.useRef()

  // 🐨 call useVirtual with the following configuration options:
  // - size (the number of items)
  // - parentRef (the listRef you created above)
  // - estimateSize (a memoized callback function that returns the size for each item)
  
  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 20, []),
    overscan: 10,
  })

  // 🐨 you can set the return value of your useVirtual call to `rowVirtualizer`

  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({inputValue: newValue}) => setInputValue(newValue),
    onSelectedItemChange: ({selectedItem}) =>
      alert(
        selectedItem
          ? `You selected ${selectedItem.name}`
          : 'Selection Cleared',
      ),
    itemToString: item => (item ? item.name : ''),
    // 🐨 set scrollIntoView to a "no-op" function
    scrollIntoView: () => {},
    // 🐨 when the highlightedIndex changes, then tell react-virtual to scroll to that index.
    onHighlightedIndexChange: ({highlightedIndex}) =>
    highlightedIndex !== -1 && rowVirtualizer.scrollToIndex(highlightedIndex),
  })

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({type: 'text'})} />
          <button onClick={() => selectItem(null)} aria-label="toggle menu">
            &#10005;
          </button>
        </div>
        <Menu
          items={items}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
          listRef={listRef}
          virtualRows={rowVirtualizer.virtualItems}
          totalHeight={rowVirtualizer.totalSize}
        />
      </div>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
