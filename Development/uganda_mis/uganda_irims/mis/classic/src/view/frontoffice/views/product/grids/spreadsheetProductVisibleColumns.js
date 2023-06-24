Ext.define('Admin.view.frontoffice.product.grids.SpreadSheetProductVisibleColumns', {
    extend: 'Ext.form.Panel',  
    width: '100%',
    xtype: 'spreadsheetproductvisiblecolumns',
    title: 'Select Visibled Columns',
    height: '100%',
    layout: 'form',
    reference:'visibleColumns',
        margin: 2,
        collapsible: true,
        autoScroll: true,
        defaults: {
            xtype: 'checkbox',
            labelAlign: 'right',
          //  width: 170,
            margin: 5,
            labelSeparator: ':',
            hideLabel: true
        },
  items:[  {
            boxLabel: 'Tracking No',
            name: 38,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Reference No',
            name: 39,
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
            boxLabel: 'Common name',
            name: 3,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Classificatione',
            name: 4,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Category',
            name: 5,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sub Category',
            name: 6,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Special Sub Category',
            name: 7,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Product Origin',
            name: 8,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Product Form',
            name: 9,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Physical Description',
            name: 10,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Storage Condition',
            name: 11,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Shelf Life(Months)',
            name: 12,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Shelf Life After Open',
            name: 13,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Duration Description',
            name: 14,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Instruction of use',
            name: 15,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Warnings',
            name: 16,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Intended End User',
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
            boxLabel: 'Applicant Postal Address',
            name: 19,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Physical Address',
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
            boxLabel: 'Local Technical Representative',
            name: 26,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Technical Representative Postal Address',
            name: 27,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Technical Representative Physical Address',
            name: 28,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Technical Representative Telephone No.',
            name: 29,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Technical Representative Mobile No.',
            name: 30,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Technical Representative Email Address',
            name: 31,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Technical Representative Country',
            name: 32,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Local Technical Representative Region',
            name: 33,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Issue Place',
            name: 34,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Application Submission Date',
            name: 35,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Certificate Issue Date',
            name: 36,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Certificate Expiry Date',
            name: 37,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },,{
            boxLabel: 'Manufacturer',
            name: 44,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Postal Address',
            name: 45,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Physical Address',
            name: 46,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Telephone No.',
            name: 47,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Mobile No.',
            name: 48,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Email Address',
            name: 49,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Country',
            name: 50,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Manufacturer Region',
            name: 51,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }]
});