# WordPress Quick Reference: Centre for Preventive Health

## 🚀 Essential WordPress Configurations

### functions.php Additions
```php
// Theme Support
function cph_theme_setup() {
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('title-tag');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
}
add_action('after_setup_theme', 'cph_theme_setup');

// Enqueue Styles & Scripts
function cph_scripts() {
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@300;400;600;700&display=swap');
    wp_enqueue_script('jquery');
}
add_action('wp_enqueue_scripts', 'cph_scripts');

// Remove WordPress version from head
remove_action('wp_head', 'wp_generator');

// Disable file editing
define('DISALLOW_FILE_EDIT', true);
```

### wp-config.php Security Additions
```php
// Security Keys (Generate at https://api.wordpress.org/secret-key/1.1/salt/)
define('AUTH_KEY',         'your-unique-phrase-here');
define('SECURE_AUTH_KEY',  'your-unique-phrase-here');
define('LOGGED_IN_KEY',    'your-unique-phrase-here');
define('NONCE_KEY',        'your-unique-phrase-here');
define('AUTH_SALT',        'your-unique-phrase-here');
define('SECURE_AUTH_SALT', 'your-unique-phrase-here');
define('LOGGED_IN_SALT',   'your-unique-phrase-here');
define('NONCE_SALT',       'your-unique-phrase-here');

// Additional Security
define('FORCE_SSL_ADMIN', true);
define('WP_POST_REVISIONS', 3);
define('AUTOSAVE_INTERVAL', 300);
```

---

## 🎨 Custom CSS for Healthcare Theme

### Brand Colors & Typography
```css
/* Root Variables */
:root {
    --primary-color: #2C5F41;
    --secondary-color: #E8F5E8;
    --accent-color: #FF6B35;
    --text-dark: #333333;
    --text-light: #666666;
    --white: #ffffff;
    --border-light: #e1e1e1;
}

/* Typography */
body {
    font-family: 'Open Sans', sans-serif;
    color: var(--text-dark);
    line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    color: var(--primary-color);
}

/* Hero Section */
.hero-banner {
    background: linear-gradient(rgba(44, 95, 65, 0.8), rgba(44, 95, 65, 0.8)), url('hero-bg.jpg');
    background-size: cover;
    background-position: center;
    min-height: 600px;
    display: flex;
    align-items: center;
    text-align: center;
    color: white;
}

.hero-content h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: white;
}

.hero-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

/* CTA Buttons */
.btn-primary {
    background-color: var(--accent-color);
    border: none;
    padding: 12px 30px;
    font-weight: 600;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: #e55a2b;
    transform: translateY(-2px);
}

.btn-secondary {
    background-color: transparent;
    border: 2px solid white;
    color: white;
    padding: 10px 28px;
    font-weight: 600;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background-color: white;
    color: var(--primary-color);
}

/* Service Cards */
.service-card {
    background: white;
    border-radius: 10px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
    border-top: 4px solid var(--primary-color);
}

.service-card:hover {
    transform: translateY(-5px);
}

.service-card .icon {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

/* WhatsApp Button */
.whatsapp-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #25D366;
    color: white;
    padding: 15px;
    border-radius: 50%;
    font-size: 1.5rem;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
}

.whatsapp-btn:hover {
    transform: scale(1.1);
    color: white;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .hero-content h1 {
        font-size: 2.5rem;
    }
    
    .hero-content p {
        font-size: 1rem;
    }
    
    .service-card {
        margin-bottom: 20px;
    }
}
```

---

## 📝 Contact Form 7 Templates

### Main Contact Form
```html
<div class="form-row">
    <div class="form-group col-md-6">
        [text* your-name class:form-control placeholder "Your Name*"]
    </div>
    <div class="form-group col-md-6">
        [tel* your-phone class:form-control placeholder "Phone Number*"]
    </div>
</div>

<div class="form-row">
    <div class="form-group col-md-6">
        [email* your-email class:form-control placeholder "Email Address*"]
    </div>
    <div class="form-group col-md-6">
        [select* health-condition class:form-control "Select Health Concern" "Diabetes" "High Blood Pressure" "Thyroid" "PCOD" "Weight Management" "General Wellness"]
    </div>
</div>

<div class="form-row">
    <div class="form-group col-12">
        [textarea your-message class:form-control placeholder "Tell us about your health concerns..."]
    </div>
</div>

<div class="form-row">
    <div class="form-group col-12">
        [radio preferred-contact "WhatsApp" "Phone Call" "Email"]
        <label>Preferred Contact Method:</label>
    </div>
</div>

<div class="form-row">
    <div class="form-group col-12">
        [acceptance acceptance-privacy class:form-check-input] I agree to the [link privacy "Privacy Policy"] and [link terms "Terms of Service"]
    </div>
</div>

[submit class:btn class:btn-primary "Book Free Consultation"]
```

### Quick WhatsApp Form
```html
<div class="whatsapp-form">
    [text* name placeholder "Your Name*"]
    [tel* phone placeholder "Phone Number*"]
    [select* service "Select Service" "1:1 Counselling" "Healthy Pune Initiative" "General Inquiry"]
    [submit class:btn class:btn-success "Chat on WhatsApp"]
</div>
```

---

## 🔌 Essential Plugin Configurations

### Yoast SEO Settings
```
General Settings:
- Site Title: Centre for Preventive Health
- Tagline: Prevent. Reverse. Thrive.
- Organization: Centre for Preventive Health
- Logo: Upload site logo
- Social Profiles: Facebook, Instagram, YouTube

Search Appearance:
- Separator: | (pipe)
- Homepage Meta: "Centre for Preventive Health | Natural Chronic Disease Reversal in Pune | Dr. Shankar Dapkekar"
```

### Contact Form 7 Email Templates
```
Subject: New Consultation Request - [your-name]

Hello Dr. Dapkekar,

A new consultation request has been received:

Name: [your-name]
Phone: [your-phone]
Email: [your-email]
Health Concern: [health-condition]
Preferred Contact: [preferred-contact]

Message:
[your-message]

Please respond within 24 hours.

Best regards,
Centre for Preventive Health Website
```

---

## 📱 Mobile Optimization Code

### Responsive Navigation
```css
/* Mobile Menu */
@media (max-width: 767px) {
    .navbar-nav {
        text-align: center;
        padding: 20px 0;
    }
    
    .navbar-nav .nav-link {
        font-size: 1.1rem;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }
    
    .cta-buttons {
        flex-direction: column;
        gap: 10px;
    }
    
    .cta-buttons .btn {
        width: 100%;
        margin: 5px 0;
    }
}
```

### Touch-Friendly Elements
```css
.mobile-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 15px;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    z-index: 999;
    display: none;
}

@media (max-width: 768px) {
    .mobile-cta {
        display: flex;
        justify-content: space-between;
    }
    
    .mobile-cta .btn {
        flex: 1;
        margin: 0 5px;
        font-size: 0.9rem;
    }
}
```

---

## 🔐 Security Hardening

### .htaccess Security Rules
```apache
# Disable directory browsing
Options -Indexes

# Protect wp-config.php
<files wp-config.php>
    order allow,deny
    deny from all
</files>

# Disable XML-RPC
<Files xmlrpc.php>
    order deny,allow
    deny from all
</Files>

# Hide WordPress version
RewriteRule ^wp-admin/includes/ - [F,L]
RewriteRule !^wp-includes/ - [S=3]
RewriteRule ^wp-includes/[^/]+\.php$ - [F,L]
RewriteRule ^wp-includes/js/tinymce/langs/.+\.php - [F,L]
RewriteRule ^wp-includes/theme-compat/ - [F,L]

# Protect sensitive files
<FilesMatch "^.*(error_log|wp-config\.php|php.ini|\.[hH][tT][aApP].*)$">
    Order deny,allow
    Deny from all
</FilesMatch>
```

---

## 📊 Google Analytics 4 Setup

### Custom Events for Healthcare Website
```javascript
// Track form submissions
document.addEventListener('wpcf7mailsent', function(event) {
    gtag('event', 'form_submission', {
        'event_category': 'engagement',
        'event_label': 'contact_form',
        'value': 1
    });
});

// Track phone clicks
document.querySelectorAll('a[href^="tel:"]').forEach(function(element) {
    element.addEventListener('click', function() {
        gtag('event', 'phone_call', {
            'event_category': 'engagement',
            'event_label': 'phone_click',
            'value': 1
        });
    });
});

// Track WhatsApp clicks
document.querySelectorAll('a[href*="wa.me"]').forEach(function(element) {
    element.addEventListener('click', function() {
        gtag('event', 'whatsapp_click', {
            'event_category': 'engagement',
            'event_label': 'whatsapp_contact',
            'value': 1
        });
    });
});
```

---

## 🎯 Local SEO Schema Markup

### Healthcare Organization Schema
```json
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Centre for Preventive Health",
    "alternateName": "CPH Pune",
    "url": "https://centreforpreventivehealth.com",
    "logo": "https://centreforpreventivehealth.com/logo.png",
    "description": "Natural chronic disease reversal center specializing in diabetes, hypertension, thyroid, and PCOD treatment without medicines.",
    "founder": {
        "@type": "Person",
        "name": "Dr. Shankar Dapkekar",
        "jobTitle": "Founder & Medical Director",
        "qualifications": "MBBS (KEM), MSc Public Health (UK), Stanford Nutrition"
    },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "[Your Street Address]",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "[Postal Code]",
        "addressCountry": "IN"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Marathi"]
    },
    "medicalSpecialty": [
        "Preventive Medicine",
        "Lifestyle Medicine",
        "Diabetes Care",
        "Hypertension Management"
    ],
    "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "18.5204",
            "longitude": "73.8567"
        },
        "geoRadius": "50000"
    }
}
</script>
```

---

## 🛠️ Troubleshooting Common Issues

### Plugin Conflicts
```
1. Deactivate all plugins
2. Check if issue persists
3. Reactivate plugins one by one
4. Identify conflicting plugin
5. Find alternative or contact plugin support
```

### Performance Issues
```
1. Check hosting resources (CPU, RAM, disk space)
2. Optimize images (compress, convert to WebP)
3. Enable caching (WP Rocket recommended)
4. Minimize plugins
5. Update WordPress core and plugins
6. Use CDN if needed
```

### Security Alerts
```
1. Change all passwords immediately
2. Update WordPress core and plugins
3. Run security scan (Wordfence)
4. Check file integrity
5. Review user accounts
6. Enable two-factor authentication
```

---

## 📞 Emergency Contacts & Resources

### Quick Support Links
- **WordPress Codex**: https://codex.wordpress.org/
- **Plugin Repository**: https://wordpress.org/plugins/
- **Theme Directory**: https://wordpress.org/themes/
- **Security**: https://wordpress.org/support/article/hardening-wordpress/
- **Performance**: https://wordpress.org/support/article/optimization/

### Backup Procedure
```
1. Database backup via UpdraftPlus
2. Files backup via hosting cPanel
3. Test restore procedure monthly
4. Store backups in multiple locations
5. Document recovery process
```

---

*Keep this reference handy during development and maintenance of the Centre for Preventive Health website.* 