Ext.define('Admin.view.reports.appsreport.gmpreport.form.DetailedGmpColumnsFrm', {
    extend: 'Ext.form.Panel',  
    width: '100%',
    xtype: 'detailedgmpcolumnsfrm',
    title: 'Select Visibled Columns',
     titleCollapse: true,
    layout: 'vbox',
        margin: 2,
        collapsible: true,
        autoScroll: true,
        defaults: {
            xtype: 'checkbox',
            labelAlign: 'right',
            margin: 5,
            labelSeparator: ':',
            hideLabel: true
        },
     items:[  {
            boxLabel: 'Tracking No',
            name: 40,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Reference No',
            name: 41,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Assessment Procedure',
            name: 2,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Facility Location',
            name: 3,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Name',
            name: 4,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturing Site',
            name: 5,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer country',
            name: 6,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Region',
            name: 7,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer District',
            name: 8,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Email',
            name: 9,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Postal Address',
            name: 10,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Physical Address',
            name: 11,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Telephone No',
            name: 12,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Mobile No',
            name: 13,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Business Type',
            name: 14,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Device Type',
            name: 15,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Gps Coordinate',
            name: 16,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Premise Registration No',
            name: 17,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant',
            name: 18,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Postal Adress',
            name:19,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant PhysicalAddress',
            name: 20,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Telephone No.',
            name: 21,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Mobile No.',
            name: 22,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Email Address',
            name: 23,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Country',
            name: 24,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Region',
            name: 25,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Agent',
            name: 26,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Agent Postal Address',
            name: 27,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Agent Physical Address',
            name: 28,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Agent Telephone No.',
            name: 29,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Agent Mobile No.',
            name: 30,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Agent Email Address',
            name: 31,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Agent Country',
            name: 32,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Agent Region',
            name: 33,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Contact Person',
            name: 34,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Contact Person PostalAddress',
            name: 35,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Contact Person Tell',
            name: 36,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Issue Place',
            name: 37,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }
        ]
});