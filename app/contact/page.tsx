import Banner from '@/components/Banner'
import FeaturedIcons from '@/components/HomePage/FeaturedIcons'
import React from 'react'
import SendMessage from '@/components/Contact/SendMessage'
import Join from '@/components/About/Join'
import ContactForm from '@/components/Contact/ContactForm'

export default function Contact() {
    return (
        <main>
            <Banner
                title="Contact us"
                img="/images/contact-banner.png"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            <FeaturedIcons />
            <SendMessage />
            <ContactForm />
            <Join />
           
            
        </main>
    )
}
