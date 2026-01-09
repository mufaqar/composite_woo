import Banner from '@/components/Banner'
import FeaturedIcons from '@/components/HomePage/FeaturedIcons'
import React from 'react'
import SendMessage from '@/components/Contact/SendMessage'
import Join from '@/components/About/Join'
import ContactForm from '@/components/Contact/ContactForm'
import { getContactPageData } from '@/lib/api/getHomeData'

export default async function Contact() {

    const data = await getContactPageData();

    const contactUs = data?.contactUs;
    const contactdetails = data?.contactDetails;

   // console.log(data);
    return (
        <main>
            <Banner
                title={contactUs?.title}
                img={contactUs?.banner?.node?.mediaItemUrl || "/images/contact-banner.png"}
                desc={contactUs?.description} />
            <FeaturedIcons />
            <SendMessage data={contactdetails} />
            <ContactForm />
            <Join />
           
            
        </main>
    )
}
