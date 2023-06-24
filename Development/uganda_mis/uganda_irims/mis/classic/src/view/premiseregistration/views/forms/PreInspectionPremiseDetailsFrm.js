
Ext.define('Admin.view.premiseregistration.views.forms.PreInspectionPremiseDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'preinspectionpremisedetailsfrm',
    alias: "widget.preinspectionpremisedetailsfrm",
    itemId: 'preinspectionpremisedetailsfrm',
    scrollable: true,
    layout: {
        type: 'column'
    },
    autoScroll: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    items: [ {
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },
    {
        xtype: 'hiddenfield',
        name: 'is_local',
        value: 1
    },
    {
        xtype: 'hiddenfield',
        name: 'premise_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'manufacturing_site_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'main_registered_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'temporal_premise_id'
    },
    {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    },{
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Premises Details',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[{
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        columnWidth: 0.9,
                        allowBlank: false,
                        fieldLabel: 'Name'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        disabled: true,
                        columnWidth: 0.1,
                        tooltip: 'Search',
                        action: 'search_premise',
                        childXtype: 'premiseselectiongrid',
                        winTitle: 'Premises Selection List',
                        winWidth: '90%',
                        margin: '30 0 0 0'
                    }
                ]
            },
            {
                xtype: 'combo',
                fieldLabel: 'Premises Type',
                name: 'business_type_id',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                allowBlank: false,
                forceSelection: true,
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStoreWithSectionFilter',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_business_types'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            },{
                    xtype: 'textfield',
                    name: 'company_registration_no',
                    fieldLabel: 'Company Registration No(RDB/RCA No)',
                    allowBlank: false
                },
                
            
             {
                xtype:'fieldcontainer',
                layout: {
                    type: 'column'
                },
                items:[ {
                        xtype: 'textfield',
                        name: 'investment_capital',
                        labelAlign: 'top',
                        columnWidth: 0.66,
                        fieldLabel: 'Capital Information',
                        allowBlank: true
                },{
                    xtype: 'combo',
                    fieldLabel: 'Currency',
                    name: 'investment_capital_currency_id',
                    allowBlank: true,
                    queryMode: 'local',
                    labelAlign: 'top',columnWidth: 0.33,
                    forceSelection: true,
                    displayField: 'name',
                    valueField: 'id',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_currencies',
                                        is_paying_currency: 1
                                    }
                                }
                            },
                            isLoad: true
                        },
                    }
             }]
            },
            
            {
                xtype: 'textfield',
                name: 'premise_reg_no',
                fieldLabel: 'Registration No',
                hidden: true,
                allowBlank: true,
                readOnly: true
            },
            {
                xtype: 'textfield',
                name: 'permit_no',
                fieldLabel: 'Permit No',
                allowBlank: true,
                hidden: true,
                readOnly: true
            },
            {
                xtype: 'textfield',
                name: 'gmp_cert_no',
                fieldLabel: 'GMP Certificate No',
                hidden: true,
                allowBlank: true,
                readOnly: true
            },]
        },{
                xtype:'fieldset',
                columnWidth: 1,
                title: "Director's Information",
                collapsible: true,
                defaults: {
                    labelAlign: 'top',
                    allowBlank: false,
                    labelAlign: 'top',
                    margin: 5,
                    xtype: 'textfield',
                    allowBlank: false,
                    columnWidth: 0.33,
                },
                layout: 'column',
                items:[{
                    xtype: 'textfield',
                    fieldLabel: 'Name of Managing Director',
                    name: 'managing_director',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: "Managing Director's Email",
                    name: 'managing_director_email',
                },{
                    xtype: 'textfield',
                    fieldLabel: "Managing Director's Telephone No",
                    name: 'managing_director_telepone',
                }, {
                    xtype: 'combo',
                    name: 'applicant_contact_person',
                    fieldLabel: 'Director as Contact Person',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    value: 1,
                    listeners: { 
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_confirmations'
                                    }
                                }
                            },
                            isLoad: true
                        },
                        change: function(cmbo,newVal){
                            var form=cmbo.up('form'),
                            contact_person=form.down('textfield[name=contact_person]'),
                            contact_telephone_no=form.down('textfield[name=contact_person_telephone]'),
                            contact_email_address=form.down('textfield[name=contact_person_email]');
                            if(newVal==1||newVal===1){
                                var is_visible = false;
                            }else{
                                var is_visible = true;
                            }
                            contact_person.setVisible(is_visible);
                            contact_telephone_no.setVisible(is_visible);
                            contact_email_address.setVisible(is_visible);
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'contact_person',
                    fieldLabel: 'Contact Person',
                    allowBlank: true,
                    hidden: true
                },{
                    xtype: 'textfield',
                    name: 'contact_person_telephone',
                    allowBlank: true,
                    fieldLabel: 'Contact Person Telephone No',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    name: 'contact_person_email',
                    allowBlank: true,
                    fieldLabel: ' Contact Person Email Address',
                    hidden: true
                }]
        },{
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Location Details',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[{
                xtype: 'combo',
                fieldLabel: 'Country',
                name: 'country_id',
                //store: 'countriesstr',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/country'
                            }
                        },
                        isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            regionStore = form.down('combo[name=region_id]').getStore(),
                            filterObj = {country_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        regionStore.removeAll();
                        regionStore.load({params: {filter: filterStr}});
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'Region',
                name: 'region_id',
                //store: 'regionsstr',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/region'
                            }
                        },
                        isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            districtStore = form.down('combo[name=district_id]').getStore(),
                            filterObj = {region_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        districtStore.removeAll();
                        districtStore.load({params: {filter: filterStr}});
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'district_id',
                //store: 'districtsstr',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/district'
                            }
                        },
                        isLoad: false
                    }
                    // ,
                    // change: function (cmbo, newVal) {
                    //     var form = cmbo.up('form'),
                    //         sectorStore = form.down('combo[name=sector_id]').getStore(),
                    //         filterObj = {district_id: newVal},
                    //         filterStr = JSON.stringify(filterObj);
                    //         sectorStore.removeAll();
                    //         sectorStore.load({params: {filter: filterStr}});
                    // }
                }
            }, 
            // {
            //     xtype: 'combo',
            //     fieldLabel: 'Sector',
            //     name: 'sector_id',
            //     forceSelection: true,
            //     queryMode: 'local',allowBlank: true,
            //     valueField: 'id',
            //     displayField: 'name',
            //     listeners: {
            //         beforerender: {
            //             fn: 'setParamCombosStore',
            //             config: {
            //                 pageSize: 100,
            //                 proxy: {
            //                     url: 'commonparam/getCommonParamFromTable',
            //                     extraParams: {
            //                         table_name: 'par_sectors'
            //                     }
            //                 }
            //             },
            //             isLoad: false
            //         },
            //         change: function (cmbo, newVal) {
            //             var form = cmbo.up('form'),
            //                 cellStore = form.down('combo[name=cell_id]').getStore(),
            //                 filterObj = {sector_id: newVal},
            //                 filterStr = JSON.stringify(filterObj);
            //                 cellStore.removeAll();
            //                 cellStore.load({params: {filter: filterStr}});
            //         }
            //     }
            // },
            // {
            //     xtype: 'combo',
            //     fieldLabel: 'Cell',
            //     name: 'cell_id',
            //     allowBlank: true,
            //     forceSelection: true,
            //     queryMode: 'local',
            //     valueField: 'id',
            //     displayField: 'name',
            //     listeners: {
            //         beforerender: {
            //             fn: 'setParamCombosStore',
            //             config: {
            //                 pageSize: 100,
            //                 proxy: {
            //                     url: 'commonparam/getCommonParamFromTable',
            //                     extraParams: {
            //                         table_name: 'par_cells'
            //                     }
            //                 }
            //             },
            //             isLoad: true
            //         }
            //     }
            // },
            // {
            //     xtype: 'textfield',
            //     fieldLabel: 'Village',
            //     name: 'village',
            //     allowBlank: true
            // },

            {
                xtype: 'textfield',
                fieldLabel: 'Physical Address',
                name: 'physical_address'
            },
            {
                xtype:'fieldcontainer',
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.49,
                    labelAlign: 'top'
                },
                items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Latitude',
                        name: 'latitude',
                        allowBlank: true
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Longitude',
                        name: 'longitude',
                        allowBlank: true
                    }
                ]
            } ]
           
        },{// email   
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Location Details',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[{
                xtype: 'textfield',
                name: 'email',
                fieldLabel: 'Official Email Address'
            },{
                xtype: 'textfield',
                name: 'postal_address',
                fieldLabel: 'Postal Address No'
            },
            {
                xtype: 'textfield',
                name: 'telephone',
                fieldLabel: 'Telephone No'
                
            }]

        }
    ]
});