/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.ApplicationPmsPlanDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationpmsplandetailsfrm',
    controller: 'surveillancevctr',
    layout: 'column',
    //frame: true,
    scrollable: true,
    bodyPadding: 5,
    itemId: 'applicationpmsplandetailsfrmRefID',
    defaults: {
        columnWidth: 1,
        labelAlign: 'top',
        allowBlank: false
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Annual PMS Program Implementation',
            style: 'background:white',
            collapsible: true,
            checkboxToggle: true,
            layout: 'column',
            defaults: {
                columnWidth: 0.33,
                margin: 2,
                labelAlign: 'top',
                allowBlank: false
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'program_id'
                },{
                    xtype: 'hiddenfield',
                    name: 'program_implementation_id'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Annual Plan Implementation',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'program_implementation',
                            readOnly: true,
                            columnWidth: 0.9
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search',
                            name: 'link_pms_plan',
                            childXtype: 'pmsprogramsappselectiongrid',
                            winTitle: 'PMS Plan Selection List',
                            winWidth: '90%'
                        }
                    ]
                },{
                    xtype: 'textfield',
                    name: 'program_name',
                    fieldLabel:'Program Name',
                    readOnly: true
                },{
                    xtype: 'textfield',
                    name: 'program_description',
                    fieldLabel:'Program Description',
                    readOnly: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Implementation Start Date',
                    submitFormat: 'Y-m-d',
                    readOnly: true,
                    format: 'd/m/Y',
                    name: 'implementationstart_date',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Implementation End Date',
                    submitFormat: 'Y-m-d',
                    readOnly: true,
                    format: 'd/m/Y',
                    name: 'implementationend_date',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                },{
                    xtype: 'combo',
                    fieldLabel: 'Type/Categryory of Sampling Site',
                    forceSelection: true,readOnly: false,
                    queryMode: 'local',
                    valueField: 'id',
                    allowBlank: false,
                    displayField: 'sampling_site',
                    name: 'sampling_site_id',
                    anyMatch: true,
                    listeners: {
                        beforerender: {
                            fn: 'setSurveillanceCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'surveillance/getPmsProgramSamplingSites'
                                }
                            },
                            isLoad: false
                        },
                        
                    }
                    }, {
                        xtype: 'combo',
                        fieldLabel: 'Region',
                        forceSelection: true,
                        queryMode: 'local',readOnly: false,
                        name: 'region_id',
                        valueField: 'region_id',
                        displayField: 'region_name',
                       
                        anyMatch: true,
                        listeners: {
                            beforerender: {
                                fn: 'setSurveillanceCombosStore',
                                config: {
                                    pageSize: 1000,
                                    proxy: {
                                        url: 'surveillance/getPmsProgramRegions'
                                    }
                                },
                                isLoad: false
                            }
                           
                        }
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'District',
                        name: 'district_id',
                        readOnly: false,
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
        },
    ]
});