import type { ReactNode } from "react";

export type SearchFormValues = {
	location: string;
	checkIn?: string;
	checkOut?: string;
};

export type CategoryItem = {
	id: string;
	label: string;
	icon: ReactNode;
};

export type Property = {
	id: string;
	slug?: string;
	title: string;
	location: string;
	pricePerNight: number;
	rating: number;
	reviewCount: number;
	imageUrl: string;
	categoryId?: string;
	isGuestFavorite?: boolean;
};

export type NavbarProps = {
	hostCtaLabel: string;
	onHostCtaClick?: () => void;
};

export type SearchFormProps = {
	initialValues?: SearchFormValues;
	onSubmit: (values: SearchFormValues) => void;
	isLoading?: boolean;
};

export type CategoryFiltersProps = {
	categories: CategoryItem[];
	activeCategoryId?: string;
	onChange: (categoryId: string) => void;
};

export type PropertyCardProps = {
	property: Property;
};

export type PropertyGridProps = {
	properties: Property[];
	isLoading?: boolean;
	emptyMessage?: string;
};

export type FooterLink = {
	label: string;
	href: string;
};

export type FooterProps = {
	year: number;
	companyName: string;
	links: FooterLink[];
};

export type SortOrder = "price-asc" | "price-desc";

export type NavbarCatalogProps = {
	searchLabel: string;
	dateRangeLabel: string;
	guestsLabel: string;
	onBack?: () => void;
	onFiltersClick?: () => void;
};

export type CatalogHeaderProps = {
	totalResults: number;
	sortOrder: SortOrder;
	onSortChange: (value: SortOrder) => void;
};

export type CatalogGridProps = {
	properties: Property[];
	isLoading?: boolean;
	emptyMessage?: string;
};

export type MapMarker = {
	id: string;
	lat: number;
	lng: number;
	pricePerNight: number;
};

export type MapSectionProps = {
	markers: MapMarker[];
	activePropertyId?: string;
	onMarkerClick?: (propertyId: string) => void;
};

export type RoomImage = {
	id: string;
	url: string;
	alt: string;
};

export type Host = {
	name: string;
	avatarUrl: string;
	yearsHosting: number;
	isSuperhost?: boolean;
};

export type Amenity = {
	id: string;
	label: string;
	icon: ReactNode;
};

export type Room = {
	id: string;
	title: string;
	subtitle: string;
	location: string;
	rating: number;
	reviewCount: number;
	guests: number;
	beds: number;
	baths: number;
	pricePerNight: number;
	cleaningFee?: number;
	serviceFee?: number;
	images: RoomImage[];
	host: Host;
	amenities: Amenity[];
};

export type ImageGalleryProps = {
	images: RoomImage[];
	initialIndex?: number;
};

export type RoomHeaderProps = {
	title: string;
	subtitle: string;
	location: string;
	rating: number;
	reviewCount: number;
	guests: number;
	beds: number;
	baths: number;
};

export type HostCardProps = {
	host: Host;
};

export type AmenitiesListProps = {
	amenities: Amenity[];
};

export type BookingCardProps = {
	pricePerNight: number;
	minGuests: number;
	maxGuests: number;
	initialGuests?: number;
	nights: number;
	checkInLabel: string;
	checkOutLabel: string;
	onReserve: (guests: number) => void;
	isLoading?: boolean;
};

export type BackNavigationProps = {
	href: "/catalog";
	label?: string;
};
