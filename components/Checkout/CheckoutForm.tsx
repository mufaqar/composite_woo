"use client";

interface CheckoutFormProps {
    formData: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function CheckoutForm({ formData, onChange }: CheckoutFormProps) {
    return (
        <form className="space-y-6">
            <h2 className="md:text-[32px] md:leading-none text-[28px] font-semibold text-title font-DM_Sans capitalize">Billing Details</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={onChange}
                        className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                        required
                    />
                </div>
                <div>
                    <input
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={onChange}
                        className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                        required
                    />
                </div>
            </div>
            <div>
                <input
                    name="companyName"
                    placeholder="Company Name (Optional)"
                    value={formData.companyName}
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                />
            </div>
            <div>
                <select
                    name="countryRegion"
                    value={formData.countryRegion}
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                    required
                >
                    <option value="">Select a country</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="USA">USA</option>
                </select>
            </div>
            <div>
                <input
                    name="streetAddress"
                    placeholder="Street Address *"
                    value={formData.streetAddress}
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                    required
                />
            </div>
            <div>
                <input
                    name="townCity"
                    placeholder="Town / City *"
                    value={formData.townCity}
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        name="postcode"
                        placeholder="Postcode *"
                        value={formData.postcode}
                        onChange={onChange}
                        className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                        required
                    />
                </div>
                <div>
                    <input
                        name="phone"
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={onChange}
                        className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                        required
                    />
                </div>
            </div>
            <div>
                <input
                    name="email"
                    type="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={onChange}
                    className="text-base font-normal text-description font-Satoshi placeholder:text-description border border-[#E4E4E4] bg-white rounded-full px-6 py-3.5 w-full outline-none focus:border-secondary"
                    required
                />
            </div>
        </form>
    );
}
