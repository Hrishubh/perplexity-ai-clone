"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { ArrowRight, AtomIcon, AudioLines, CpuIcon, GlobeIcon, MicIcon, Paperclip, PinIcon, SearchCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AIModelsOptions } from '@/services/Shared';
import { supabase } from '@/services/supabase';
import { useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

function ChatInputBox() {
  const [userSearchInput, setUserSearchInput] = useState();
  const {user} = useUser();
  const [searchType, setSearchType] = useState('search');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSearchQuery = async() => {
    setLoading(true);
    const libId = uuidv4();
    const {data} = await supabase.from('Library').insert([
      {
        searchInput:userSearchInput,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        type: searchType,
        libId:libId
      }
    ]).select();

    // Redirect to new screen
    router.push(`/search/`+libId);
		console.log("library record created:")
    console.log(data[0]);
    setLoading(false);
  }
  return (
		<div className="flex flex-col h-screen items-center justify-center w-full">
			<Image src={"/logo.png"} alt="logo" width={260} height={250} />
			<div className="p-5 w-full max-w-2xl border rounded-2xl mt-6">
				<div className="flex justify-between items-end">
					<Tabs defaultValue="Search" className="w-[400px]">
						<TabsContent value="Search">
							<input
								type="text"
								placeholder="Ask Anything"
								className="w-full p-4 outline-none"
								onChange={(e) =>
									setUserSearchInput(e.target.value)
								}
							/>
						</TabsContent>
						<TabsContent value="Research">
							<input
								type="text"
								placeholder="Research Anything"
								className="w-full p-4 outline-none"
								onChange={(e) =>
									setUserSearchInput(e.target.value)
								}
							/>
						</TabsContent>
						<TabsList>
							<TabsTrigger
								value="Search"
								className={"text-primary"}
								onClick={() => setSearchType("search")}
							>
								<SearchCheck /> Search
							</TabsTrigger>
							<TabsTrigger
								value="Research"
								className={"text-primary"}
								onClick={() => setSearchType("research")}
							>
								<AtomIcon /> Research
							</TabsTrigger>
						</TabsList>
					</Tabs>
					<div className="flex gap-4 items-center">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[>svg]:px-3">
									<CpuIcon className="text-gray-500 h-5 w-5 " />
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
								{/* <DropdownMenuSeparator /> */}
								{AIModelsOptions.map((model, index) => (
									<DropdownMenuItem
										className="mb-1"
										key={index}
									>
										<div>
											<h2 className="text-s">
												{model.name}
											</h2>
											<p className="text-xs">
												{model.desc}
											</p>
										</div>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
						<Button variant={"ghost"}>
							<GlobeIcon className="text-gray-500 h-5 w-5 " />
						</Button>
						<Button variant={"ghost"}>
							<Paperclip className="text-gray-500 h-5 w-5 " />
						</Button>
						<Button variant={"ghost"}>
							<MicIcon className="text-gray-500 h-5 w-5 " />
						</Button>
						<Button
							disabled={loading}
							onClick={() => {
								userSearchInput ? onSearchQuery() : null;
							}}
						>
							{!userSearchInput ? (
								<AudioLines className="text-white h-5 w-5 " />
							) : (
								<ArrowRight className="text-white h-5 w-5 " />
							)}
						</Button>
					</div>
				</div>
			</div>
		</div>
  );
}

export default ChatInputBox