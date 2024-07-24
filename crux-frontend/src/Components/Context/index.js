import { createContext } from "react";

export const AppContext = createContext({
    loading: false,
    cruxData: [],
    formFactor: "DESKTOP",
    columns : ["cumulative_layout_shift", "experimental_time_to_first_byte", "first_contentful_paint", "first_input_delay", "interaction_to_next_paint", "largest_contentful_paint", "navigation_types", "round_trip_time"]
})
