"use client";

import { Store } from "@prisma/client";
import {
	Check,
	ChevronsUpDown,
	PlusCircle,
	Store as StoreIcon,
} from "lucide-react";
import { useState } from "react";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>;
interface StoreSwitcherProps extends PopoverTriggerProps {
	items: Store[];
}

export default function StoreSwitcher({
	className,
	items = [],
}: StoreSwitcherProps) {
	const storeModal = useStoreModal();
	const params = useParams();
	const router = useRouter();

	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	);

	const [open, setOpen] = useState(false);

	const onStoreSelect = (store: { value: string; label: string }) => {
		setOpen(false);
		router.push(`/${store.value}`);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					role='combobox'
					aria-expanded={open}
					aria-label='Select a store'
					className={cn("w-[200px] justify-between", className)}
				>
					<StoreIcon className='mr-2 h-4 w-4' />
					{currentStore?.label}
					<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command className='border'>
					<CommandList>
						<CommandInput placeholder='Search store...' />
						<CommandEmpty>No Store Found</CommandEmpty>
						<CommandGroup heading='Stores'>
							{formattedItems.map((store) => (
								<CommandItem
									key={store.value}
									className='text-sm'
									onSelect={() => onStoreSelect(store)}
								>
									<StoreIcon className='mr-2 h-4 w-4' />
									{store.label}
									<Check
										className={cn(
											"ml-auto h-4 w-4",
											currentStore?.value === store.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									setOpen(false);
									storeModal.onOpen();
								}}
							>
								<PlusCircle className='h-5 w-5 mr-2' />
								Create Store
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
