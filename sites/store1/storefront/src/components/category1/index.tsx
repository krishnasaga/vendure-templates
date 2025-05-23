import { component$ } from '@builder.io/qwik';
export default component$(() => {
	return (
		<div class="bg-orange-500 p-8">
			<h2 class="text-white text-5xl font-bold mb-8 text-center">Shop Our Category</h2>
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8 container mx-auto">
				{/* Category Card Component */}
				{[
					{
						name: 'Electronics',
						desc: 'Explore a wide range',
						img: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600',
					},

					{
						name: 'Computer',
						desc: 'Browse our collection of desktops.',
						img: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVza3RvcCUyMGNvbXB1dGVyfGVufDB8fDB8fHww',
					},

					{
						name: 'Equipment',
						desc: 'Stay fit and active with our range of gym and exercise equipment.',
						img: 'https://images.unsplash.com/photo-1470940511639-1068d7764233?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhc3xlbnwwfHwwfHx8MA%3D%3D',
					},

					{
						name: 'Camera and Photo',
						desc: 'Capture every moment with our wide selection of cameras',
						img: 'https://images.unsplash.com/photo-1470940511639-1068d7764233?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhc3xlbnwwfHwwfHx8MA%3D%3D',
					},
				].map((category) => (
					<div key={category.name} class="bg-white  rounded-sm shadow-md">
						<img src={category.img} alt={category.name} class="w-full h-80 object-cover" />
						<div class="p-4 text-center">
							<h2 class="text-lg font-semibold">{category.name}</h2>
							<p class="text-gray-600">{category.desc}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
});
