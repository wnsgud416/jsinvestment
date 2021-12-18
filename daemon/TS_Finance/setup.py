from distutils.core import Extension, setup
#from setuptools import find_packages
from Cython.Build import cythonize

# C 파일 및 라이브러리 만들기
# python3.7 setup.py build_ext --inplace

setup(
    name="Complie",
    ext_package='Finance',
    version = '1.0',
    description = 'Tuttle ship Finance module',
    author='KGH',
    author_email='pistolmr@kakao.com',
#    install_requires=install_requires,
#    setup_requires=setup_requires,
#    dependency_links=dependency_links,
    #scripts=['main.py'],

    ### adding packages
    #packages=find_packages('src'),
    package_dir={'': '../Finance'},


    # trying to add files...
    include_package_data=True,
    package_data={
           '': ['*.sh'],
           '': ['static/*.sh'],
           'static': ['*.sh'],
    },
    ext_modules=cythonize(
        [
            Extension(name="TS_NaverFinance_Bulk_Module", sources=["Proc/TS_NaverFinance_Bulk_Module.py"]),
            Extension(name="TS_NaverFinance_Module", sources=["Proc/TS_NaverFinance_Crawling_Module.py"]),
            Extension(name="TS_Scraper", sources=["Utill/TS_Scraper.py"]),
            Extension(name="TS_Utill.py", sources=["Utill/TS_Utill.py"]),
        ]
     )
)
#setup(
#    name="My Main app",
#    ext_modules=cythonize('main.py', compiler_directives={'embedsignature': True}),
#)


'''
ext_1 = Extension(name="libArgParsor", sources=["Config/ArgParsor.py"])
ext_2= Extension(name="libDEF", sources=["Config/DEF.py"])
setup(ext_modules=cythonize(ext_1))
setup(ext_modules=cythonize(ext_2))
setup(ext_modules=cythonize(ext_2))
setup(ext_modules=cythonize(ext_2))
main_mod = Extension('modname',
        include_dirs = ['C:\Libraries\Boost\include',
                        'C:\Libraries\SDL\include',
                        'C:\Libraries\SDL_image\include'],

        libraries = ['libSDL',
                     'SDL_image'],

        library_dirs = ['C:\Libraries\SDL\lib',
                        'C:\Libraries\SDL_image\lib'],

        sources = ['main.cpp',
                   'Object1.cpp',
                   'Object2.cpp',
                   'Etcetera.cpp'])

'''


