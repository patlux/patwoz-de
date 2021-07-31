---
title: How to block camera video access outside of Home for Eufy Cameras in Fritz!Box
published_at: 2021-07-31
tags: smart, home, fritzbox
layout: ../../layouts/til.astro
---

# How to block camera video access outside of Home for Eufy Cameras in Fritz!Box

To use the eufy cam only for internal access and block every connection to the internet, we need to create a "Zugangsprofil" in your fritzbox.

We do this as following:

1. Login into your fritzbox interface
2. Go to "Internet" -> "Filter" -> "Listen" and create a new list

![Open fritzbox and go to Internet, Filter, Listen](/assets/today-i-learned/2021-07-31-eufy-indoor-cam-2k-fritzbox-block-firewall/fritzbox-7590-internet-filter-listen-add.jpg)

3. Enter a name like "Alles außer Eufy" to filter everything except system relevant ports
4. To block everything except the needed ports, we need to create 4 new entries:

**TCP**

- Protokoll: TCP
- Quellport: Beliebig
- Zielport: 1 - 442

--

- Protokoll: TCP
- Quellport: Beliebig
- Zielport: 444 - 65535

**UDP**

- Protokoll: UDP
- Quellport: Beliebig
- Zielport: 1 - 32099

--

- Protokoll: UDP
- Quellport: Beliebig
- Zielport: 32101 - 65535

![Create a new list for blocking everything except eufy system relevant ports](/assets/today-i-learned/2021-07-31-eufy-indoor-cam-2k-fritzbox-block-firewall/fritzbox-7590-internet-filter-listen-eufy.jpg)

Now all outgoing connections are blocked and you shouldn't see a livestream of you camera in your eufy app when your are using the cellular network. It should only work in your home network.
