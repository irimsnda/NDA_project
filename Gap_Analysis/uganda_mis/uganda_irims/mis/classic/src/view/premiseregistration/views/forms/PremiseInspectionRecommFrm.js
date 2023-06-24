
Ext.define('Admin.view.premiseregistration.views.forms.PremiseInspectionRecommFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premiseinspectionrecommfrm',
    controller: 'premiseregistrationvctr',
    frame: true,
    scrollable:true,
    //autoScroll:true,
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 0.5,
        labelAlign: 'top',
        margin: 4,
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        name:'isReadOnly'
    },{
        xtype: 'hiddenfield',
        name: 'id'
    },
     {
            xtype: 'hidden',
            name: '_token',
            value: token
        }, 
    {
        xtype: 'hiddenfield',
        name: 'record_id'
    },
    {
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
                        name: 'premise_name',
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
            title: 'Recommendations',
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
        {
            xtype: 'textarea',
            columnWidth: 1,
            name: 'premise_state',
            fieldLabel: 'State of finishing; walls, roof and floor',
            allowBlank: true
        },
        {
            xtype: 'textarea',
            name: 'premise_size',
            columnWidth: 1,
            fieldLabel: 'Size of premises in square meters (indicate dimensions)',
            allowBlank: true
        },
        {
            xtype: 'textarea',
            name: 'proposed_changes',
            columnWidth: 1,
            fieldLabel: 'Proposed changes/adjustments to premises if any',
            allowBlank: true
        },
        {
            xtype: 'textarea',
            columnWidth: 1,
            name: 'remarks',
            fieldLabel: 'Any other comments',
            allowBlank: true
        },
        {
            xtype: 'datefield',
            name: 'actual_start_date',
            fieldLabel: 'Actual Start Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            listeners: {
                change: function (field, newVal, oldVal) {
                    var form = field.up('form'),
                        end_date = form.down('datefield[name=actual_end_date]');
                    end_date.setMinValue(newVal);
                }
            }
        },
        {
            xtype: 'datefield',
            name: 'actual_end_date',
            fieldLabel: 'Actual End Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'combo',
            name: 'inspection_type_id',
            fieldLabel: 'Inspection Type',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_inspection_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo',
            name: 'recommendation_id',
            fieldLabel: "Inspector's Recommendation",
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_premiseinspection_recommendations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }

        ]
     }
        
    ],
    buttons: [
        {
            text: 'Save Inspection Details & Recommendation',
            iconCls: 'x-fa fa-save',
            formBind: true,
            ui: 'soft-purple',
            name:'btn_preminsprecommendation',
            handler: 'doSaveInspectionRecommendationDetails',
            action_url: 'premiseregistration/savePremiseInspectionRecommendation',
            table_name: 'tra_premiseinspection_applications',
        }
    ]
});