
Ext.define('Admin.view.drugshopregistration.views.forms.DrugShopDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugshopdetailsfrm',
    alias: "widget.drugshopdetailsfrm",
    itemId: 'drugshopdetailsfrm',
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
            items:[  {
                xtype: 'combo',
                name: 'applicant_type_id',
                fieldLabel: 'You are making the application for:',
                forceSelection: true,
                queryMode: 'local',
                allowBlank: false,
                valueField: 'id',
                displayField: 'name',
                listeners: {
                 beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_premiseapplications_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
           },{
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'tpin_no',
                        columnWidth: 0.9,
                        allowBlank: false,
                        fieldLabel: 'Tin No'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        disabled: true,
                        columnWidth: 0.1,
                        tooltip: 'Search',
                        disabled:true,
                        action: 'search_tinno',
                        childXtype: 'tinnoeselectiongrid',
                        winTitle: 'Tin No Selection List',
                        winWidth: '90%',
                        margin: '30 0 0 0'
                    }
                ]
            }, 


            {
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
                xtype: 'textfield',
                name: 'company_registration_no',
                fieldLabel: 'Registration No',
                allowBlank: true
            },
            {
            xtype: 'datefield',
            name: 'registration_date',
            fieldLabel: 'Registration Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
           },
            {
                xtype: 'combo',
                fieldLabel: 'Premises Category',
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
            },


             {
                xtype: 'combo',
                fieldLabel: 'Business Scale',
                name: 'business_scale_id',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                allowBlank: true,
                forceSelection: true,
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_business_scales'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            },
            
               {
                xtype: 'combo',
                fieldLabel: 'Product Classification',
                name: 'product_classification_id',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                allowBlank: true,
                forceSelection: true,
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_premise_class'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
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
            },

            ]
        },
        {
                xtype:'fieldset',
                columnWidth: 1,
                title: "Director's Information and Declarations",
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
                },
                 {
                xtype: 'combo',
                fieldLabel: 'Has the applicant,any partner or director been convicted within the past three years, within or outside Uganda, of any offence involving drug?',
                // margin: '0 20 20 20',
               // fieldWidth: 300,
                name: 'had_offence',
                columnWidth: 1,
                allowBlank: true,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 1){
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=offence]');
                            offence.setVisible(true);
                            offence.allowBlank = false;
                            offence.validate();
                        }else{
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=offence]');
                            offence.setVisible(false);
                            offence.allowBlank = true;
                            offence.validate();
                        }
                        
                    }
                   
                }
            },{
                xtype: 'htmleditor',
                fieldLabel: 'Details',
                // margin: '0 20 20 20',
                columnWidth: 1,
                name: 'offence',
                hidden: true,
                allowBlank: true
            },
             {
                xtype: 'combo',
                fieldLabel: 'Has any previous application by the applicants any partner or director,for a license to operate any type of pharmaceutical business been refused or cancelled?',
                // margin: '0 20 20 20',
               // fieldWidth: 300,
                name: 'had_cancelled_application',
                columnWidth: 1,
                allowBlank: true,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 1){
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=cancelling_reason]');
                            offence.setVisible(true);
                            offence.allowBlank = false;
                            offence.validate();
                        }else{
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=cancelling_reason]');
                            offence.setVisible(false);
                            offence.allowBlank = true;
                            offence.validate();
                        }
                        
                    }
                   
                }
            },{
                xtype: 'htmleditor',
                fieldLabel: 'Details',
                // margin: '0 20 20 20',
                columnWidth: 1,
                name: 'cancelling_reason',
                hidden: true,
                allowBlank: true
            },

             {
                xtype: 'combo',
                fieldLabel: 'Does the applicant work in any other health institution (Private or Public) ?',
                // margin: '0 20 20 20',
               // fieldWidth: 300,
                name: 'is_workinotherinstitutions',
                columnWidth: 1,
                allowBlank: true,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 1){
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=working_inotherinstitutions]');
                            offence.setVisible(true);
                            offence.allowBlank = false;
                            offence.validate();
                        }else{
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=working_inotherinstitutions]');
                            offence.setVisible(false);
                            offence.allowBlank = true;
                            offence.validate();
                        }
                        
                    }
                   
                }
            },{
                xtype: 'htmleditor',
                fieldLabel: 'Details',
                // margin: '0 20 20 20',
                columnWidth: 1,
                name: 'working_inotherinstitutions',
                hidden: true,
                allowBlank: true
            },

              {
                xtype: 'combo',
                fieldLabel: 'Does the applicant,any partner or director currently hold a license to operate any type of Pharmaceutical business at any other premises ?',
                // margin: '0 20 20 20',
               // fieldWidth: 300,
                name: 'has_otherlicense',
                columnWidth: 1,
                allowBlank: true,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 1){
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=working_inotherinstitutions]');
                            offence.setVisible(true);
                            offence.allowBlank = false;
                            offence.validate();
                        }else{
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=working_inotherinstitutions]');
                            offence.setVisible(false);
                            offence.allowBlank = true;
                            offence.validate();
                        }
                        
                    }
                   
                }
            }, {
                xtype: 'combo',
                fieldLabel: 'Is application onbehalf ?',
                // margin: '0 20 20 20',
               // fieldWidth: 300,
                name: 'is_onbehalf',
                columnWidth: 1,
                allowBlank: true,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    }
                    //,
                    // change: function(combo, newVal, oldValue, eopts) {
                    //     if(newVal == 1){
                    //         var form = combo.up('form'),
                    //             offence = form.down('htmleditor[name=working_inotherinstitutions]');
                    //         offence.setVisible(true);
                    //         offence.allowBlank = false;
                    //         offence.validate();
                    //     }else{
                    //         var form = combo.up('form'),
                    //             offence = form.down('htmleditor[name=working_inotherinstitutions]');
                    //         offence.setVisible(false);
                    //         offence.allowBlank = true;
                    //         offence.validate();
                    //     }
                        
                    // }
                   
                }
            },{
                xtype: 'htmleditor',
                fieldLabel: 'Details',
                // margin: '0 20 20 20',
                columnWidth: 1,
                name: 'working_inotherinstitutions',
                hidden: true,
                allowBlank: true
            }]
        },
        {
                xtype:'fieldset',
                columnWidth: 1,
                title: "Supervising Personnel",
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
                  items:[
            // {
            //     xtype: 'fieldcontainer',
            //     layout: 'column',
            //     defaults: {
            //         labelAlign: 'top'
            //     },
            //     fieldLabel: 'Name',
            //     items: [
            //         {
            //             xtype: 'textfield',
            //             name: 'supervisor_name',
            //             columnWidth: 0.9,
            //             readOnly: true,
            //             allowBlank: true
            //         },
            //         {
            //             xtype: 'button',
            //             iconCls: 'x-fa fa-link',
            //             columnWidth: 0.1,
            //             tooltip: 'Link Supervising Personnel',
            //             name:'link_personnel',
            //             handler:'showClnPersonnelSelectionGrid',
            //             childXtype: 'clntraderpersonnelgrid',
            //             winWidth: '70%'
            //         }
            //     ]
            // },
               {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Name',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'supervisor_name',
                            columnWidth: 0.9,
                            readOnly: true
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-link',
                            columnWidth: 0.1,
                            bind: {
                                disabled: '{isReadOnly}'
                            },
                            tooltip: 'Link Personnel',
                            name:'link_personnel',
                            handler:'showTraderSupervisorSelectionGrid',
                            childXtype: 'traderpersonnelgrid',
                            winWidth: '70%'
                        }
                    ]
                },

            {
                xtype: 'textfield',
                name: 'supervisor_telephone_no',
                allowBlank:true,
                fieldLabel: 'Telephone No',
                readOnly: true
            },
             {
                xtype: 'textfield',
                name: 'supervisor_email_address',
                allowBlank:true,
                fieldLabel: 'Email Address',
                readOnly: true
              },
                {
                    xtype: 'textfield',
                    name: 'supervisor_registration_no',
                    allowBlank:true,
                    fieldLabel: 'Registration No'
                },

                 {
                    xtype: 'datefield',
                    name: 'supervisor_registration_date',
                    fieldLabel: 'Registration Date',
                    submitFormat: 'Y-m-d',
                    allowBlank:true,
                    format: 'd/m/Y',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                   },

         
                {
                    xtype: 'combo',
                    name: 'supervisor_qualification_id',
                    fieldLabel: 'Qualification',
                    forceSelection: true,
                    queryMode: 'local',
                    allowBlank: true,
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                     beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_personnel_qualifications'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
               },{
                xtype: 'combo',
                fieldLabel: 'Country',
                name: 'supervisor_country_id',
                //store: 'supervisorcountriesstr',
                allowBlank:true,
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
                        isLoad: true
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            regionStore = form.down('combo[name=supervisor_region_id]').getStore(),
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
                name: 'supervisor_region_id',
                //store: 'regionsstr',
                allowBlank:true,
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
                            districtStore = form.down('combo[name=supervisor_district_id]').getStore(),
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
                name: 'supervisor_district_id',
                //store: 'districtsstr',
                allowBlank:true,
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
                  
                }
              }
            ]
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
                  
                }
            }, 
          

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
            } ,
            {
                xtype: 'textfield',
                name: 'email',
                fieldLabel: 'Official Email Address'
            },{
                xtype: 'textfield',
                name: 'street',
                fieldLabel: 'Road/ Street'
            },
            {
                xtype: 'textfield',
                name: 'telephone',
                fieldLabel: 'Telephone No'
                
            }]

     }
    ]
});