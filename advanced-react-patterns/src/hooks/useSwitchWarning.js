import { useEffect, useRef } from 'react'

export const useSwitchWarning = (controlPropValue, controlPropName, componentName, hasOnChange, readOnly, readOnlyProp, initialValueProp, onChangeProp) => {
    const isControlled = controlPropValue != null
    const {current: wasControlled} = useRef(isControlled)
    
    useEffect(() => {
        if(isControlled && !wasControlled) {
            console.error (
            `\`${componentName}\` is changing from uncontrolled to controlled. Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
            )
        }
        if(!isControlled && wasControlled) {
            console.error (
            `\`${componentName}\` is changing from controlled to uncontrolled. Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
            )
        }
       
        }, [componentName, controlPropName, hasOnChange, isControlled, readOnly, wasControlled])

    useEffect(() => {
        if (!hasOnChange && isControlled && !readOnly) {
            console.error (
            `Rendering read-only toggle. If you want it to be mutable, use \`${initialValueProp}\`. Otherwise, set either \`${onChangeProp}\` or \`${readOnlyProp}\`.`,
            )
        }
        }, [
            componentName,
            controlPropName,
            isControlled,
            hasOnChange,
            readOnly,
            onChangeProp,
            initialValueProp,
            readOnlyProp,
            ])
}