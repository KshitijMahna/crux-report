import { useState } from 'react'

const useAppData = () => {

    const [loading, setLoading] = useState(false)
    const [cruxData, setCruxData] = useState([])
    const [formFactor, setFormFactor] = useState("DESKTOP")
    const [columns, setColumns] = useState(["cumulative_layout_shift", "experimental_time_to_first_byte", "first_contentful_paint", "first_input_delay", "interaction_to_next_paint", "largest_contentful_paint", "navigation_types", "round_trip_time"])

    return{cruxData, setCruxData, loading, setLoading, formFactor, setFormFactor, columns, setColumns}
}

export default useAppData
