import { Button, ContainedList, ContainedListItem, Modal, Stack, TextInput } from "@carbon/react"
import { Close } from "@carbon/react/icons"
import { useState } from "react"
import { createPortal } from "react-dom"

interface DeployRouteModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

interface DeployedRoutes {
    id: string;
    name: string;
    namespace: string;
}

export const DeployRouteModal = ({ open, setOpen }: DeployRouteModalProps) => {
    const [name, setName] = useState('')
    const [namespace, setNamespace] = useState('default')

    const deployedRoutes: DeployedRoutes[] = [
        {
            id: "asd",
            name: "sample",
            namespace: "sample"
        }
    ];

    const onClose = () => {
        setName('')
        setNamespace('default')
        setOpen(false);
    }

    const handleDeploy = () => {
        // PUT to KEIP
        onClose()
    };

    const handleCancel = () => {
        onClose()
    };

    const deleteRoute = () => {
        // TODO
        onClose()
    }

    const deleteRouteAction = <Button kind="ghost" iconDescription="Delete" hasIconOnly renderIcon={Close} aria-label="Delete" onClick={deleteRoute} />;

    return createPortal(
        <Modal
            open={open}
            modalHeading="Deploy Routes"
            primaryButtonText="Deploy"
            secondaryButtonText="Cancel"
            onRequestClose={handleCancel}
            onRequestSubmit={handleDeploy}
        >
            <Stack gap={6}>
                <TextInput
                    id="name-input"
                    labelText="Name"
                    placeholder="Route name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextInput
                    id="namespace-input"
                    labelText="Namespace"
                    value={namespace}
                    onChange={(e) => setNamespace(e.target.value)}
                />
                <ContainedList label="Deployed Routes">
                    {deployedRoutes.map((item) => (
                        <ContainedListItem action={deleteRouteAction}>{item.name} - {item.namespace}</ContainedListItem>
                    ))}
                </ContainedList>
            </Stack>
        </Modal>,
        document.body
    )
}
