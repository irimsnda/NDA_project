Ext.define('Admin.view.reports.appsreport.importexportreport.form.DetailedImportExportColumnsFrm', {
    extend: 'Ext.form.Panel',  
    width: '100%',
    xtype: 'detailedimportexportcolumnsfrm',
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
            name: 1,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Reference No',
            name: 2,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Application Type',
            name: 3,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Permit Type',
            name: 4,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Permit Category',
            name: 5,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Import Category Type',
            name: 6,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Permit Reason',
            name: 7,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee',
            name: 8,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Postal Address',
            name: 9,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Physical Address',
            name: 10,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Telephone No',
            name: 11,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Mobile No',
            name: 12,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Email',
            name: 13,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Country',
            name: 14,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Region',
            name: 15,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Consignee Options',
            name: 16,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received',
            name: 17,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Postal Address',
            name: 18,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Physical Address',
            name: 19,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Telephone No',
            name: 20,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Mobile No',
            name: 21,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Email',
            name: 22,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Country',
            name: 23,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Sender/Received Region',
            name: 24,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
      }, {
          boxLabel: 'Premises Name',
          name: 25,
          checked: false,
          listeners: {
              change: 'func_showhideSpreasheetColumn'
          }
      }, {
          boxLabel: 'Premises Postal Address',
          name: 26,
          checked: false,
          listeners: {
              change: 'func_showhideSpreasheetColumn'
          }
      }, {
          boxLabel: 'Premises Physical Address',
          name: 27,
          checked: false,
          listeners: {
              change: 'func_showhideSpreasheetColumn'
          }
      }, {
          boxLabel: 'Premises Telephone',
          name: 28,
          checked: false,
          listeners: {
              change: 'func_showhideSpreasheetColumn'
          }
      }, {
          boxLabel: 'Premises Mobile',
          name: 29,
          checked: false,
          listeners: {
              change: 'func_showhideSpreasheetColumn'
          }
      }, {
          boxLabel: 'Premises Expiry Date',
          name: 30,
          checked: false,
          listeners: {
              change: 'func_showhideSpreasheetColumn'
          }
      }, {
            boxLabel: 'Applicant',
            name: 31,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Postal Address',
            name: 32,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Physical Address',
            name: 33,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Telephone No.',
            name: 34,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Mobile No.',
            name: 35,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Email Address',
            name: 36,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Country',
            name: 37,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Applicant Region',
            name: 38,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Port of Entry/Exit',
            name:39,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Certificate/Permit Issue Place',
            name: 40,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Payment Currencys',
            name: 41,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Proforma Invoice No',
            name: 42,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Proforma Invoice Dates',
            name: 43,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Certificate Issue Date',
            name: 44,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Certificate Expiry Date',
            name: 45,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }
        ]
});