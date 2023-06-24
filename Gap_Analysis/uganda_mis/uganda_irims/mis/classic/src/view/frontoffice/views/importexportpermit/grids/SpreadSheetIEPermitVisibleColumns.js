Ext.define('Admin.view.frontoffice.importexportpermit.grids.SpreadSheetIEPermitVisibleColumns', {
    extend: 'Ext.form.Panel',  
    width: '100%',
    xtype: 'spreadsheetiepermitvisiblecolumns',
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
            name: 49,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Reference No',
            name: 50,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Brand Name',
            name: 2,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Quantity',
            name: 3,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Total Weight',
            name: 4,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Weight Units',
            name: 5,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Unit Price',
            name: 6,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Total Value',
            name: 7,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Currency Name',
            name: 8,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Premises Name',
            name: 9,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Premises Postal Address',
            name: 10,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Premises Physical Address',
            name: 11,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Premises Telephone',
            name: 12,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Premises Mobile',
            name: 13,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Premises Expiry Date',
            name: 14,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Application Category',
            name: 15,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Application Type Category',
            name: 16,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Permit Reason',
            name: 17,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee',
            name: 18,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Postal Address',
            name: 19,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Physical Address',
            name: 20,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Telephone No',
            name: 21,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Mobile No',
            name: 22,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Email',
            name: 23,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Country',
            name: 24,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Region',
            name: 25,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Options',
            name: 26,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received',
            name: 27,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Postal Address',
            name: 28,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Physical Address',
            name: 29,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Telephone No',
            name: 30,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Mobile No',
            name: 31,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Email',
            name: 32,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Country',
            name: 33,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Region',
            name: 34,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },,{
            boxLabel: 'Applicant',
            name: 35,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Postal Address',
            name: 36,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Physical Address',
            name: 37,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Telephone No.',
            name: 38,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Mobile No.',
            name: 39,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Email Address',
            name: 40,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Country',
            name: 41,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Region',
            name: 42,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Port of Entry/Exit',
            name:43,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Certificate/Permit Issue Place',
            name: 44,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Proforma Invoice No',
            name: 45,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Proforma Invoice Dates',
            name: 46,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Certificate Issue Date',
            name: 47,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Certificate Expiry Date',
            name: 48,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Receipt No',
            name: 55,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Invoice No',
            name: 56,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Invoice Amount',
            name: 57,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Paid Amount',
            name: 58,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Pay Currency',
            name: 59,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }
        ]
});