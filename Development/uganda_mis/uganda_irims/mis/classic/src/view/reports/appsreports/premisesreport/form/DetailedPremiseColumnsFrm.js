Ext.define('Admin.view.reports.appsreport.premisesreport.form.DetailedPremiseColumnsFrm', {
    extend: 'Ext.form.Panel',  
    width: '100%',
    xtype: 'detailedpremisecolumnsfrm',
    title: 'Select Visible Columns',
    height: '100%',
    layout: 'form',
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
              items:[ {
                        boxLabel: 'Tracking No',
                        name: 33,
                        checked: true,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Reference No',
                        name: 34,
                        checked: true,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    }, {
                        boxLabel: 'Premise Name',
                        name: 2,
                        checked: true,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Postal Address',
                        name: 3,
                        checked: true,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Physical Address',
                        name: 4,
                        checked: true,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Premise Category',
                        name: 5,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Email',
                        name: 6,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Telephone',
                        name: 7,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Mobile Number',
                        name: 8,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Premise Country',
                        name: 9,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Premise Region',
                        name: 10,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Premise District',
                        name: 11,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Business Type',
                        name: 12,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Business Category',
                        name: 13,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Business Scale',
                        name: 14,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Business Type Details',
                        name: 15,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Contact Person',
                        name: 16,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Contact Telephone No',
                        name: 17,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Contact Email',
                        name: 18,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Contact Startdate',
                        name: 19,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Contact EndDate',
                        name: 20,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Trader',
                        name: 21,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Trader Postal Address',
                        name: 22,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Trader Physical Address',
                        name: 23,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Trader Telephone No.',
                        name: 24,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Trader Mobile No.',
                        name: 25,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Trader Email',
                        name: 26,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Trader Country',
                        name: 27,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Trader Region',
                        name: 28,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Premise Geo Coordinates',
                        name: 29,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Place of Issue',
                        name: 30,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Certificate Issue Date',
                        name: 31,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    },{
                        boxLabel: 'Certificate Expiry Date',
                        name: 32,
                        checked: false,
                        listeners: {
                            change: 'func_showhideSpreasheetColumn'
                        }
                    }
                    
                    ]
});